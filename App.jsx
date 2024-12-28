import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import PostList from './PostList';
import SearchBar from './SearchBar';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);

  // Fetch posts from API
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
        setFilteredPosts(response.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError('Failed to fetch data');
        Alert.alert('Error', 'Unable to load posts. Please try again later.');
      });
  }, []);

  // Filter posts by title based on search text
  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  // Handle post selection for highlighting
  const handleSelectPost = (id) => {
    setHighlightedId(id === highlightedId ? null : id); // Toggle highlighting
  };

  return (
    <View style={styles.container}>
      <SearchBar searchText={searchText} onSearch={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <PostList
          posts={filteredPosts}
          highlightedId={highlightedId}
          onSelectPost={handleSelectPost}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  }
});

export default App;
