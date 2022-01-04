import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import StoryDetailsModalScreen from '../screens/StoryDetailsModalScreen';
import { RootStackParamsList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="BottomTabs"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="StoryDetailsModal"
        component={StoryDetailsModalScreen}
        options={({ route }) => ({
          presentation: 'modal',
          title: route.params.title,
        })}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
