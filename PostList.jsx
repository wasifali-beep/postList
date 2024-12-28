import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PostList = ({ posts, highlightedId, onSelectPost }) => {

  const renderItem = ({ item }) => {
    const isHighlighted = item.id === highlightedId;
    return (
      <TouchableOpacity
        style={[styles.item, isHighlighted && styles.highlighted]}
        onPress={() => onSelectPost(item.id)}
      >
        <Text style={[styles.title, isHighlighted && styles.highlightedText]}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 3,
  },
  highlighted: {
    backgroundColor: '#e0e0e0',
  },
  highlightedText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});

export default PostList;
