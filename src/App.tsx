import React from 'react';
import {
  createClient,
  dedupExchange,
  fetchExchange,
  Provider as UrqlProvider,
} from 'urql';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { cacheExchange } from '@urql/exchange-graphcache';
import schema from '../graphql.schema.json';
import { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast';

const url =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/graphql'
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
});

const client = createClient({
  url,
  exchanges: [dedupExchange, clientCache, fetchExchange],
});

const App = () => {
  return (
    <UrqlProvider value={client}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </UrqlProvider>
  );
};

export default App;
