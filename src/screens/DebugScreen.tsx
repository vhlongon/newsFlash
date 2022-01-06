import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dataKey, metadataKey } from '../storage';

const DebugScreen = () => {
  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem(dataKey);
      console.log(`${dataKey} in Storage cleared`);
      await AsyncStorage.removeItem(metadataKey);
      console.log(`${metadataKey} in Storage cleared`);
    } catch (error) {
      console.log(error);
      console.warn('something went wrong while clearing app items in storage');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={clearStorage}>
        <Text style={styles.buttonText}>Clear Async Storage</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    maxWidth: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: 'indigo',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DebugScreen;
