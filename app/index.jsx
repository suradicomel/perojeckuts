import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const router= useRouter()

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => setCategories(res.data.categories))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kategori Resep</Text>
      <FlatList
        data={categories}
        keyExtractor={item => item.idCategory}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>{
              console.log(`Navigating to: /recipedetailscreen/${item.idCategory}`);
               router.push(`/recipedetailscreen/${item.idCategory}`)}}
          >
            <Text style={styles.title}>{item.strCategory}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 16, backgroundColor: '#f0f0f0', marginVertical: 8, borderRadius: 8 },
  title: { fontSize: 18 }
});
