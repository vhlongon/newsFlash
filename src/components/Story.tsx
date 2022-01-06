import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  StorySummaryFieldsFragment,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '../graphql/generated/graphql-types';
import { RootStackParamsList } from '../types';

interface Props extends StorySummaryFieldsFragment {
  cta: 'add' | 'remove';
}
const Story = ({ id, title, summary, bookmarkId, cta }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const [{ fetching: isAddingBookmark }, addBookmark] =
    useAddBookmarkMutation();

  const [{ fetching: isRemovingBookmark }, removeBookmark] =
    useRemoveBookmarkMutation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('StoryDetailsModal', {
          id,
          title,
        });
      }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {title} {bookmarkId ? '🔖' : ''}
        </Text>
        {!bookmarkId && !isAddingBookmark && cta === 'add' && (
          <Pressable
            onPress={() => {
              addBookmark({ storyId: id });
            }}>
            <Text>Add bookmark</Text>
          </Pressable>
        )}
        {bookmarkId && !isRemovingBookmark && cta === 'remove' && (
          <Pressable
            onPress={() => {
              removeBookmark({ bookmarkId });
            }}>
            <Text>Remove bookmark</Text>
          </Pressable>
        )}
        {isAddingBookmark ||
          (isRemovingBookmark && <ActivityIndicator color="indigo" />)}
      </View>
      <Text style={styles.summary}>{summary}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  summary: {
    fontSize: 18,
    color: 'grey',
  },
});

export default Story;
