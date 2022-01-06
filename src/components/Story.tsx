import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CombinedError } from 'urql';
import {
  StorySummaryFieldsFragment,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '../graphql/generated/graphql-types';
import { RootStackParamsList } from '../types';

type Cta = 'add' | 'remove';

interface Props extends StorySummaryFieldsFragment {
  cta: Cta;
}

const handleMessageError = (type: Cta, error: CombinedError) => {
  const isOffline = error?.message?.includes('You are offline');

  if (isOffline) {
    const message = `Please connect to the internet to ${type} history to your bookmarks`;
    Alert.alert('You are offline', message);
  } else {
    Alert.alert('An error ocurred', error.message);
  }
};

const Story = ({ id, title, summary, bookmarkId, cta }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const [{ fetching: isAddingBookmark, error: addBookmarkError }, addBookmark] =
    useAddBookmarkMutation();

  const [
    { fetching: isRemovingBookmark, error: removeBookmarkError },
    removeBookmark,
  ] = useRemoveBookmarkMutation();

  const handleAddBookmark = async () => {
    const result = await addBookmark({ storyId: id });

    if (result.error) {
      handleMessageError('add', result.error);
    }
  };

  const handleRemoveBookmark = async () => {
    if (bookmarkId) {
      const result = await removeBookmark({ bookmarkId });

      if (result.error) {
        handleMessageError('remove', result.error);
      }
    }
  };

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
          <Pressable onPress={handleAddBookmark}>
            <Text style={styles.cta}>Add </Text>
          </Pressable>
        )}
        {bookmarkId && !isRemovingBookmark && cta === 'remove' && (
          <Pressable onPress={handleRemoveBookmark}>
            <Text style={styles.cta}>Remove</Text>
          </Pressable>
        )}
        {((isAddingBookmark && !addBookmarkError) ||
          (isRemovingBookmark && !removeBookmarkError)) && (
          <ActivityIndicator color="indigo" />
        )}
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
  cta: {
    color: 'black',
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
