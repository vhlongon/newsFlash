import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAllStoriesQuery } from '../graphql/generated/graphql-types';
import { RootStackParamsList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const StoriesScreen = () => {
  const [{ data, error, fetching }] = useAllStoriesQuery();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

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
    <FlatList
      contentContainerStyle={styles.flatListContainer}
      style={styles.flatList}
      data={data.stories}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigation.navigate('StoryDetailsModal', {
              id: item.id,
              title: item.title,
            });
          }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    paddingVertical: 20,
  },
  flatList: {
    paddingHorizontal: 20,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
  },
  summary: {
    fontSize: 18,
    color: 'grey',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 40,
  },
});

export default StoriesScreen;
