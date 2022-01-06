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
import { useNetInfo } from '@react-native-community/netinfo';
import { SafeAreaView } from 'react-native-safe-area-context';

const StoryDetailsModalScreen = () => {
  const { params } =
    useRoute<RouteProp<RootStackParamsList, 'StoryDetailsModal'>>();
  const [{ data, fetching, error }] = useStoryByIdQuery({
    variables: { id: params.id },
  });
  const { isConnected } = useNetInfo();

  if (fetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="indigo" />
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
        <Text>No data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView>
        <Text style={styles.summary}>{data.story?.summary}</Text>
        {data.story?.text ? (
          <>
            <View style={styles.divider} />
            <Text style={styles.text}>{data.story?.text}</Text>
            <View style={styles.divider} />
            <Text style={styles.author}>{data.story?.author}</Text>
          </>
        ) : (
          <>
            <View style={styles.divider} />
            {isConnected === false ? (
              <Text style={{ ...styles.text, textAlign: 'center' }}>
                No text data
              </Text>
            ) : (
              <ActivityIndicator color="indigo" />
            )}
          </>
        )}
      </SafeAreaView>
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
    backgroundColor: '#fff',
  },
  author: {
    fontStyle: 'italic',
    fontSize: 16,
    color: 'grey',
  },
  summary: {
    fontSize: 20,
    marginBottom: 20,
    lineHeight: 24,
    color: 'grey',
    textAlign: 'justify',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    color: 'grey',
  },
});

export default StoryDetailsModalScreen;
