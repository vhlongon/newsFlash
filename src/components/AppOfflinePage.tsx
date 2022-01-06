import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

const AppOfflinePage = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text style={styles.heading}>Your are offline</Text>
      <Text style={styles.text}>Please check you data connection</Text>
    </View>
  );
};

export default AppOfflinePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'black',
  },
  text: {
    marginTop: 15,
    fontSize: 18,
    color: 'grey',
  },
});
