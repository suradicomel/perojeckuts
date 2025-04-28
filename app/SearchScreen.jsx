import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import { Route } from 'expo-router/build/Route';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(res => setResults(res.data.meals || []))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Cari resep..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Cari" onPress={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => Route.push('/RecipeDetail', { id: item.idMeal })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.thumbnail} />
            <Text style={styles.title}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8 },
  card: { flexDirection: 'row', alignItems: 'center', marginVertical: 8, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8 },
  thumbnail: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  title: { fontSize: 16 }
});
