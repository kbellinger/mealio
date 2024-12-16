import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";import { Text } from "react-native-paper";
import { Entypo } from "@expo/vector-icons"; // Import icon library
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Ensure you have your Firebase config set up
import { useRouter, useLocalSearchParams } from "expo-router";

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState({});
  const [isMenuVisible, setMenuVisible] = useState(false); // Toggle for menu visibility


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const recipeData = docSnap.data();
          setRecipe(recipeData);
          setUpdatedRecipe(recipeData); // Initialize edit form data
        } else {
          console.error("No such recipe!");
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDeleteRecipe = async () => {
    try {
      const recipeRef = doc(db, "recipes", id);
      await deleteDoc(recipeRef);
      Alert.alert("Success", "Recipe deleted successfully!");
      router.back();
    } catch (error) {
      console.error("Error deleting recipe:", error);
      Alert.alert("Error", "Could not delete the recipe.");
    }
  };

  const handleUpdateRecipe = async () => {
    try {
      const recipeRef = doc(db, "recipes", id);
      await updateDoc(recipeRef, updatedRecipe);
      setRecipe(updatedRecipe); // Update state with new data
      setEditModalVisible(false);
      Alert.alert("Success", "Recipe updated successfully!");
    } catch (error) {
      console.error("Error updating recipe:", error);
      Alert.alert("Error", "Could not update the recipe.");
    }
  };

  const handleInputChange = (field, value) => {
    setUpdatedRecipe((prev) => ({ ...prev, [field]: value }));
  };

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  const totalTime = parseInt(recipe.prepTime || 0) + parseInt(recipe.cookTime || 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.recipeContainer}>
      {/* <View style={styles.header}>
          <Text variant="displayLarge">{recipe.title}</Text> */}
          {/* Three Dots Menu */}
          {/* <TouchableOpacity onPress={() => setMenuVisible(!isMenuVisible)}>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {isMenuVisible && (
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setMenuVisible(false);
                setEditModalVisible(true);
              }}
            >
              <Text style={styles.menuText}>Edit Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setMenuVisible(false);
                handleDeleteRecipe();
              }}
            >
              <Text style={styles.menuText}>Delete Recipe</Text>
            </TouchableOpacity>
          </View>
        )} */}
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
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Recipe</Text>
            <TextInput
              style={styles.input}
              placeholder="Recipe Name"
              value={updatedRecipe.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Total Time (mins)"
              value={updatedRecipe.totalTime}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange("totalTime", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingredients (comma-separated)"
              value={updatedRecipe.ingredients.join(", ")}
              onChangeText={(text) =>
                handleInputChange("ingredients", text.split(", "))
              }
            />
            <TextInput
              style={[styles.input, styles.instructionsInput]}
              placeholder="Instructions"
              value={updatedRecipe.instructions}
              multiline
              onChangeText={(text) => handleInputChange("instructions", text)}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleUpdateRecipe}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
  backText: { fontSize: 16, color: "blue", margin: 16 },
  recipeContainer: { padding: 16, paddingBottom: 200 },
  description: { marginVertical: 8, fontStyle: "italic" },
  sectionTitle: { marginTop: 16, fontWeight: "bold" },
  item: { marginVertical: 4 },
  editButton: { backgroundColor: "blue", padding: 12, marginTop: 10 },
  deleteButton: { backgroundColor: "red", padding: 12, marginTop: 10 },
  buttonText: { color: "white", textAlign: "center" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: { backgroundColor: "white", width: "90%", padding: 20, borderRadius: 8 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 12,
    padding: 8,
  },
  instructionsInput: { height: 100, textAlignVertical: "top" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
  saveButton: { backgroundColor: "green", padding: 10, borderRadius: 8, flex: 1, marginRight: 5 },
  cancelButton: { backgroundColor: "gray", padding: 10, borderRadius: 8, flex: 1, marginLeft: 5 },
});