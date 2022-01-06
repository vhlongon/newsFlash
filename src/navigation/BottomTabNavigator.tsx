import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoriesScreen from '../screens/StoriesScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import { BottomTabsParamsList } from '../types';
import DebugScreen from '../screens/DebugScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomTabs = createBottomTabNavigator<BottomTabsParamsList>();

const BottomTabNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'indigo',
        tabBarIcon: ({ color, size, focused }) => {
          const icons: Record<typeof route.name, string> = {
            Bookmarks: 'bookmark',
            Stories: 'book',
            Debug: 'settings',
          };

          return (
            <Ionicons
              name={icons[route.name]}
              size={size}
              color={focused ? 'indigo' : color}
            />
          );
        },
      })}>
      <BottomTabs.Screen name="Stories" component={StoriesScreen} />
      <BottomTabs.Screen name="Bookmarks" component={BookmarksScreen} />
      <BottomTabs.Screen name="Debug" component={DebugScreen} />
    </BottomTabs.Navigator>
  );
};

export default BottomTabNavigator;
