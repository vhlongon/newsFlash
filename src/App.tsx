import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { createClient, Provider as UrqlProvider } from 'urql';
import Stories from './Stories';

const client = createClient({ url: 'http://localhost:3000/graphql' });

const App = () => {
  return (
    <UrqlProvider value={client}>
      <StatusBar hidden />
      <View style={styles.container}>
        <Stories />
      </View>
    </UrqlProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default App;
