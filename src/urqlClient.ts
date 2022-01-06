import { offlineExchange as urqlOfflineExchange } from '@urql/exchange-graphcache';
import { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast';
import { Platform } from 'react-native';
import {
  createClient,
  dedupExchange,
  Exchange,
  fetchExchange,
  makeErrorResult,
} from 'urql';
import graphqlSchema from '../graphql.schema.json';
import {
  AddBookmarkMutation,
  AddBookmarkMutationVariables,
  AllBookmarks,
  AllBookmarksQuery,
  RemoveBookmarkMutation,
  RemoveBookmarkMutationVariables,
  StoryBookMarkFragment,
} from './graphql/generated/graphql-types';
import { storage } from './storage';
import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo';
import { share, pipe, filter, map, merge } from 'wonka';

const url =
  Platform.OS === 'android'
    ? 'http://192.168.50.217:3000/graphql'
    : 'http://localhost:3000/graphql';

let disconnect: NetInfoSubscription | null = null;

// Custom exchange to handle mutations executed offline
const offlineMutationExchange: () => Exchange = () => {
  let connected = true;

  // this make sure the event listener is cleaned up if the exchange is regenerated
  if (disconnect) {
    disconnect();
    disconnect = null;
  }
  disconnect = NetInfo.addEventListener(state => {
    connected = state.isConnected === true;
  });

  return ({ forward }) => {
    return ops$ => {
      const sharedOperations = pipe(ops$, share);

      // split into 2 groups
      // mutations executed when the user is offline
      const offlineMutations = pipe(
        sharedOperations,
        filter(op => op.kind === 'mutation' && !connected),
        map(op => makeErrorResult(op, new Error('You are offline'))),
      );

      // and everything else
      const otherOperations = pipe(
        sharedOperations,
        filter(
          op => op.kind !== 'mutation' || (op.kind === 'mutation' && connected),
        ),
      );

      return merge([forward(otherOperations), offlineMutations]);
    };
  };
};

const offlineExchange = urqlOfflineExchange({
  storage,
  schema: graphqlSchema as IntrospectionData,
  resolvers: {
    Query: {
      // this will make sure that the partially fetched data is cached
      // so that we can load it from cache when user open the story details modal
      story: (_, args) => ({ __typename: 'Story', id: args.id }),
    },
  },
  updates: {
    Mutation: {
      addBookmark: (
        result: AddBookmarkMutation,
        args: AddBookmarkMutationVariables,
        cache,
      ) => {
        if (result.addBookmark) {
          // update allBookmarks query in the cache when we add a bookmark to a story
          cache.updateQuery(
            { query: AllBookmarks },
            (data: AllBookmarksQuery | null) => {
              if (data?.bookmarks && result.addBookmark) {
                data.bookmarks.push(result.addBookmark);
              }
              return data;
            },
          );
        }
      },
      removeBookmark: (
        result: RemoveBookmarkMutation,
        args: RemoveBookmarkMutationVariables,
        cache,
      ) => {
        if (result.removeBookmark) {
          let storyId: undefined | string;
          // update allBookmarks query in the cache when we remove a bookmark from a story
          cache.updateQuery(
            { query: AllBookmarks },
            (data: AllBookmarksQuery | null) => {
              if (data?.bookmarks) {
                // find the story id of the story that we want to remove the bookmark from
                storyId = data.bookmarks.find(
                  item => item.id === args.bookmarkId,
                )?.story.id;
                data.bookmarks = data.bookmarks.filter(
                  item => item.id !== args.bookmarkId,
                );
              }
              return data;
            },
          );

          if (storyId) {
            cache.writeFragment(StoryBookMarkFragment, {
              id: storyId,
              bookmarkId: null,
            });
          }
        }
      },
    },
  },
});

export const urqlClient = createClient({
  url,
  exchanges: [
    dedupExchange,
    offlineExchange,
    offlineMutationExchange(),
    fetchExchange,
  ],
});
