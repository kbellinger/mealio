import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useRouter } from 'expo-router'
import { Button, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Searchbar, Text } from 'react-native-paper'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RecipeCard from '../../components/RecipeCard';
import AddButton from '../../components/AddButton';

export default function RecipeLibraryPage() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const router = useRouter();

  const categories = [
    "American", "Italian", "Mexican", "Asian", "Easy", "Under 30 min", "Dinner",
    "Breakfast", "Lunch", "Beef", "Poultry", "Pork", "Casserole", "Side",
    "Dessert", "Gluten Free", "Low Calorie", "Snacks", "Family", "Kids"
  ];
  
  const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const recipesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipesList);
      setFilteredRecipes(recipesList);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    let updatedRecipes = recipes;

    if (searchQuery) {
      updatedRecipes = updatedRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      updatedRecipes = updatedRecipes.filter((recipe) =>
        selectedCategories.every((category) => recipe.categories?.includes(category))
      );
    }

    setFilteredRecipes(updatedRecipes);
  }, [searchQuery, selectedCategories, recipes]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleRecipeAdded = () => {
    fetchRecipes();        // Refresh the recipe list
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search Recipes"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <ScrollView horizontal contentContainerStyle={styles.categoryContainer} showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategories.includes(category) && styles.categoryButtonSelected,
            ]}
            onPress={() => toggleCategory(category)}
          >
            <Text
              style={
                selectedCategories.includes(category)
                  ? styles.categoryButtonTextSelected
                  : styles.categoryButtonText
              }
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.gallery}>
      <ScrollView>
        <Text variant="displaySmall">All Recipes</Text>
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onPress={() => router.push(`/recipe/${recipe.id}`)}
          />
        ))}
      </ScrollView>


      </View>
        <AddButton onRecipeAdded={handleRecipeAdded}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  gallery: {
    flex: 100,
    padding: 10,
    marginBottom: 5,
  },
  categoryContainer: {
    maxHeight: 50, // Set a fixed height for the category section
    flexDirection: "row",
    flexGrow: 0,
    padding: 8,
    alignItems: "center", // Center the buttons vertically
  },
  categoryButton: {
    marginHorizontal: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D9885B", // Default border color for unselected
    backgroundColor: "#FFF", // Default background color for unselected
  },
  categoryButtonSelected: {
    backgroundColor: "#D9885B", // Selected button color
    borderWidth: 0,
  },
  categoryButtonText: {
    color: "#D9885B", // Default text color
    fontSize: 14,
    fontWeight: "700",
  },
  categoryButtonTextSelected: {
    color: "#FFF", // Text color when selected
    fontSize: 14,
    fontWeight: "700",
  },
  searchInput: {
    margin: 8,
    backgroundColor: "white",
  },
});