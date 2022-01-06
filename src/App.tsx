import React from 'react';
import { Provider as UrqlProvider } from 'urql';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { useNetInfo } from '@react-native-community/netinfo';
import AppOfflineMessage from './components/AppOfflineMessage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { urqlClient } from './urqlClient';

const App = () => {
  const { isConnected } = useNetInfo();

  return (
    <SafeAreaProvider>
      <UrqlProvider value={urqlClient}>
        <StatusBar hidden />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        {isConnected === false && <AppOfflineMessage />}
      </UrqlProvider>
    </SafeAreaProvider>
  );
};

export default App;
