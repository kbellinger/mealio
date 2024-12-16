import React, { useEffect, useState } from "react";
import {
  
  ScrollView,
  StyleSheet,
  View,
 
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { useRouter } from 'expo-router'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Ensure your Firebase config is set up
import {Button, Searchbar, IconButton, Snackbar, Text, } from "react-native-paper";
import RecipeCardCondensed from "../../components/RecipeCardCondensed";
import RecipeCard from "../../components/RecipeCard";

export default function MealPlan() {
  const [mealPlan, setMealPlan] = useState({
    Sunday: { breakfast: [], lunch: [], dinner: [] },
    Monday: { breakfast: [], lunch: [], dinner: [] },
    Tuesday: { breakfast: [], lunch: [], dinner: [] },
    Wednesday: { breakfast: [], lunch: [], dinner: [] },
    Thursday: { breakfast: [], lunch: [], dinner: [] },
    Friday: { breakfast: [], lunch: [], dinner: [] },
    Saturday: { breakfast: [], lunch: [], dinner: [] },
  });
  const [recipes, setRecipes] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Sunday");
  const [mealType, setMealType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const router = useRouter();


  const days = [
    { short: "Su", full: "Sunday" },
    { short: "M", full: "Monday" },
    { short: "Tu", full: "Tuesday" },
    { short: "W", full: "Wednesday" },
    { short: "Th", full: "Thursday" },
    { short: "F", full: "Friday" },
    { short: "Sa", full: "Saturday" },
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
    if (searchQuery) {
      setFilteredRecipes(
        recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchQuery, recipes]);

  const openAddMealModal = (type) => {
    setMealType(type);
    setModalVisible(true);
  };

  const handleAddMeal = (recipe) => {
    setMealPlan((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [mealType]: [...prev[selectedDay][mealType], recipe],
      },
    }));
    setModalVisible(false);
    setSnackbarVisible(true);
  };

  const handleDeleteMeal = (type, index) => {
    Alert.alert("Delete Meal", "Are you sure you want to delete this meal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setMealPlan((prev) => ({
            ...prev,
            [selectedDay]: {
              ...prev[selectedDay],
              [type]: prev[selectedDay][type].filter((_, i) => i !== index),
            },
          }));
        },
      },
    ]);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="displaySmall">Your Week</Text>
      <View style={styles.weekRow}>
        {days.map(({ short, full }) => (
          <TouchableOpacity
            key={full}
            style={[
              styles.dayButton,
              selectedDay === full && styles.selectedDayButton,
            ]}
            onPress={() => setSelectedDay(full)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay === full && styles.selectedDayText,
              ]}
            >
              {short}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.mealsContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title} variant="headlineLarge">{selectedDay}'s Meals:</Text> 
        {["breakfast", "lunch", "dinner"].map((meal) => (
          <View key={meal} style={styles.mealSection}>
            <View style={styles.titleAndButton}>
              <Text style={styles.sectionTitle} variant="headlineMedium">{meal.charAt(0).toUpperCase() + meal.slice(1)}</Text>
              <IconButton
                icon="plus"
                iconColor="white"
                containerColor="#D9885B"
                mode="contained"
                onPress={() => openAddMealModal(meal)}
              />
            </View>
            {mealPlan[selectedDay][meal].length === 0 ? (
              <Text variant="titleMedium">No meals planned for {meal}.</Text>
            ) : (
              <View style={styles.recipeContainer}>
                {mealPlan[selectedDay][meal].map((recipe, index) => (
                  <View key={recipe.id} style={styles.mealItemContainer}>
                    <RecipeCardCondensed
                      recipe={recipe} 
                      key={recipe.id}
                      onPress={() => {
                        router.push(`/recipe/${recipe.id}`) 
                      }}
                      style={styles.mealItem}
                    />
                    <IconButton
                      icon="delete"
                      onPress={() => handleDeleteMeal(meal, index)}
                    />
                  </View>
                ))}
              </View>
              
            )}
          </View>
        ))}
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide">
        <Text variant="displaySmall" style={styles.selectionTitle}>Select a Meal for {selectedDay}</Text>
        <View style={styles.modalContainer}>
          <Searchbar
            placeholder="Search for a recipe"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <ScrollView>
          {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onPress={() => handleAddMeal(recipe)}
          />
        ))}
          </ScrollView>
          <Button onPress={() => setModalVisible(false)}>Cancel</Button>
        </View>
      </Modal>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Meal added successfully!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 12,
  },
  dayButton: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 2,
  },
  selectedDayButton: {
    backgroundColor: "#A8B77D",
  },
  dayText: {
    color: "#000",
  },
  selectedDayText: {
    color: "#fff",
  },
  mealsContainer: {
    flex: 1,
  },
  mealSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    // fontSize: 18,
    fontWeight: "bold",
  },
  recipeContainer: {
    marginTop: 8,
    
  },
  mealItemContainer: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
  },
  mealItem: {
    flex: 1,
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    padding: 16,
  },
  titleAndButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  snackbar: {
    backgroundColor: "#4CAF50",
  },
  selectionTitle: {
    padding: 16,
    marginTop: 50,
  }
});
