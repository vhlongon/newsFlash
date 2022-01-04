import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useStoryByIdQuery } from '../graphql/generated/graphql-types';
import { RootStackParamsList } from '../types';

const StoryDetailsModalScreen = () => {
  const { params } =
    useRoute<RouteProp<RootStackParamsList, 'StoryDetailsModal'>>();

  const [{ data, fetching, error }] = useStoryByIdQuery({
    variables: { id: params.id },
  });

  if (fetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="grey" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>No data</Text>;
      </View>
    );
  }
  return (
    <View>
      <Text>Title: {data.story?.title}</Text>
      <Text>Summary: {data.story?.summary}</Text>
      <Text>Author: {data.story?.author}</Text>
      <Text>Text: {data.story?.text}</Text>
      <Text>BookmarkId: {data.story?.bookmarkId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StoryDetailsModalScreen;
