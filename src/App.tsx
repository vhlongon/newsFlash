import React from 'react';
import { createClient, Provider as UrqlProvider } from 'urql';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';

const url =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/graphql'
    : 'http://localhost:3000/graphql';

const client = createClient({ url });

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
