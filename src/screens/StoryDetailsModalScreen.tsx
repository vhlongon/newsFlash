import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
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
    <ScrollView style={styles.scrollView}>
      <Text style={styles.summary}>{data.story?.summary}</Text>
      <View style={styles.divider} />
      <Text style={styles.text}>{data.story?.text}</Text>
      <View style={styles.divider} />
      <Text style={styles.author}>{data.story?.author}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    marginVertical: 10,
    height: 1,
    backgroundColor: 'darkgrey',
  },
  scrollView: {
    padding: 20,
  },
  author: {
    fontStyle: 'italic',
    fontSize: 16,
    color: 'grey',
    marginBottom: 20,
  },
  summary: {
    fontSize: 20,
    marginBottom: 20,
    lineHeight: 24,
    textAlign: 'justify',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default StoryDetailsModalScreen;
