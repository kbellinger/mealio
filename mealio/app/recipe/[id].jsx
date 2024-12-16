import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Ensure you have your Firebase config set up
import { useRouter, useLocalSearchParams } from "expo-router";

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRecipe(docSnap.data());
        } else {
          console.error("No such recipe!");
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  const totalTime = parseInt(recipe.prepTime || 0) + parseInt(recipe.cookTime || 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.recipeContainer}>
        <Text variant="displayLarge">{recipe.title}</Text>
        <Text variant="titleLarge" style={styles.description}>{recipe.description}</Text>
        <Text variant="bodyLarge">Prep Time: {recipe.prepTime} minutes</Text>
        <Text variant="bodyLarge">Cook Time: {recipe.cookTime} minutes</Text>
        <Text variant="bodyLarge">Total Time: {totalTime} minutes</Text>
        {/* <Text>Categories: {recipe.categories?.join(", ")}</Text> */}

        <Text variant="titleLarge" style={styles.sectionTitle}>Ingredients:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} variant="bodyLarge" style={styles.item}>{ingredient}</Text>
        ))}
        <Text variant="titleLarge" style={styles.sectionTitle}>Instructions:</Text>
        {recipe.instructions.map((instruction, index) => (
          <Text key={index} variant="bodyLarge" style={styles.item}>{index + 1}. {instruction}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  recipeContainer: {
    padding: 16,
    paddingBottom: 200,
  },
  description: {
    marginVertical: 8,
    fontStyle: "italic",
  },
  sectionTitle: {
    marginTop: 16,
    fontWeight: "bold",
  },
  item: {
    marginVertical: 4,
  },
});