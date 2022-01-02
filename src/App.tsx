import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import { createClient, Provider as UrqlProvider } from 'urql';

const client = createClient({ url: 'https://localhost:3000/graphql' });

const App = () => {
  return (
    <UrqlProvider value={client}>
      <SafeAreaView>
        <StatusBar hidden />
        <ScrollView>
          <Text>News flash</Text>
        </ScrollView>
      </SafeAreaView>
    </UrqlProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
