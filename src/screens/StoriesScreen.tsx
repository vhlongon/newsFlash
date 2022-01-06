import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import Story from '../components/Story';
import { useAllStoriesQuery } from '../graphql/generated/graphql-types';
import { useWithRefresh } from '../hooks/useWithRefresh';

const StoriesScreen = () => {
  const [{ data, error, fetching }, refreshStories] = useAllStoriesQuery();
  const { isRefreshing, setisRefreshing } = useWithRefresh(fetching);

  const handleRefresh = () => {
    setisRefreshing(true);
    refreshStories({ requestPolicy: 'network-only' });
  };

  if (fetching && !isRefreshing) {
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

  if (!data || data?.stories?.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No data</Text>
      </View>
    );
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      contentContainerStyle={styles.flatListContainer}
      style={styles.flatList}
      data={data.stories}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => <Story {...item} cta="add" />}
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
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 40,
  },
});

export default StoriesScreen;
