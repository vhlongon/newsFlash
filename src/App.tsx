import React from 'react';
import {
  createClient,
  dedupExchange,
  fetchExchange,
  Provider as UrqlProvider,
} from 'urql';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { cacheExchange } from '@urql/exchange-graphcache';
import schema from '../graphql.schema.json';
import { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast';
import {
  AddBookmarkMutation,
  AddBookmarkMutationVariables,
  AllBookmarks,
  AllBookmarksQuery,
  RemoveBookmarkMutation,
  RemoveBookmarkMutationVariables,
  StoryBookMarkFragment,
} from './graphql/generated/graphql-types';
import { useNetInfo } from '@react-native-community/netinfo';
import AppOfflinePage from './components/AppOfflinePage';
const url =
  Platform.OS === 'android'
    ? 'http://192.168.50.217:3000/graphql'
    : 'http://localhost:3000/graphql';

const clientCache = cacheExchange({
  schema: schema as IntrospectionData,
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

const client = createClient({
  url,
  exchanges: [dedupExchange, clientCache, fetchExchange],
});

const App = () => {
  const { isConnected } = useNetInfo();

  if (isConnected === false) {
    return <AppOfflinePage />;
  }

  return (
    <UrqlProvider value={client}>
      <StatusBar hidden />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </UrqlProvider>
  );
};

export default App;
