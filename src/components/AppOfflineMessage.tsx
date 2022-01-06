import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppOfflineMessage = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom, marginTop: -insets.bottom / 2 },
      ]}>
      <Text style={styles.text}>You are offline</Text>
    </View>
  );
};

export default AppOfflineMessage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  text: {
    color: 'white',
  },
});
