import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { createClient, Provider as UrqlProvider } from 'urql';
import Stories from './Stories';

const client = createClient({ url: 'http://localhost:3000/graphql' });

const App = () => {
  return (
    <UrqlProvider value={client}>
      <SafeAreaView>
        <StatusBar hidden />
        <Stories />
      </SafeAreaView>
    </UrqlProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
