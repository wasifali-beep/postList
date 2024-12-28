import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchText, onSearch }) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        placeholder="Search by title..."
        value={searchText}
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  }
});

export default SearchBar;
