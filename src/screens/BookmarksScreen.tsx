import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Story from '../components/Story';
import { useAllBookmarksQuery } from '../graphql/generated/graphql-types';
import { useWithRefresh } from '../hooks/useWithRefresh';

const BookmarksScreen = () => {
  const [{ data, fetching, error }, refreshBoookmarks] = useAllBookmarksQuery();
  const { isRefreshing, setisRefreshing } = useWithRefresh(fetching);

  const handleRefresh = () => {
    setisRefreshing(true);
    refreshBoookmarks({ requestPolicy: 'network-only' });
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

  if (!data || data?.bookmarks?.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No bookmarks</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.flatListContainer}
        style={styles.flatList}
        data={data.bookmarks}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <Story {...item.story} cta="remove" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    paddingVertical: 20,
  },
  flatList: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 40,
  },
});

export default BookmarksScreen;
