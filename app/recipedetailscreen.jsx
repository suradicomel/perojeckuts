import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => setMeal(res.data.meals[0]))
        .catch(err => console.log(err));
    }
  }, [id]);

  if (!meal) return <Text>Loading...</Text>;

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.subheading}>Bahan-bahan:</Text>
      {getIngredients().map((item, index) => (
        <Text key={index} style={styles.ingredient}>{item}</Text>
      ))}
      <Text style={styles.subheading}>Langkah-langkah:</Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  subheading: { fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 6 },
  ingredient: { fontSize: 16, marginVertical: 2 },
  instructions: { fontSize: 16, marginTop: 8, lineHeight: 22 }
});
