import React from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useAllStoriesQuery } from './graphql/generated/graphql-types';

const Stories = () => {
  const [{ data, error, fetching }] = useAllStoriesQuery();

  if (fetching) {
    return <ActivityIndicator color="grey" />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (!data) {
    return <Text>No data</Text>;
  }

  return (
    <View>
      <FlatList
        data={data.stories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default Stories;
