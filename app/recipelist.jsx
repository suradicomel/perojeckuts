import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function RecipeListScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (category) {
      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => setMeals(res.data.meals))
        .catch(err => console.log(err));
    }
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resep untuk {category}</Text>
      <FlatList
        data={meals}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/recipedetailscreen?id=${item.idMeal}`)}
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
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { flexDirection: 'row', alignItems: 'center', marginVertical: 8, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 },
  thumbnail: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  title: { fontSize: 16 }
});
