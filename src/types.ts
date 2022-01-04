import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamsList = {
  BottomTabs: NavigatorScreenParams<BottomTabsParamsList>;
  StoryDetailsModal: { id: string; title: string };
};

export type BottomTabsParamsList = {
  Stories: undefined;
  Bookmarks: undefined;
};
