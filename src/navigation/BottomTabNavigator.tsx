import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoriesScreen from '../screens/StoriesScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import { BottomTabsParamsList } from '../types';

const BottomTabs = createBottomTabNavigator<BottomTabsParamsList>();

const BottomTabNavigator = () => {
  return (
    <BottomTabs.Navigator defaultScreenOptions={{}}>
      <BottomTabs.Screen name="Stories" component={StoriesScreen} />
      <BottomTabs.Screen name="Bookmarks" component={BookmarksScreen} />
    </BottomTabs.Navigator>
  );
};

export default BottomTabNavigator;
