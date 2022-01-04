import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, StyleSheet, Pressable } from 'react-native';
import { StorySummaryFieldsFragment } from '../graphql/generated/graphql-types';
import { RootStackParamsList } from '../types';

const Story = ({ id, title, summary }: StorySummaryFieldsFragment) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('StoryDetailsModal', {
          id,
          title,
        });
      }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.summary}>{summary}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});

export default Story;
