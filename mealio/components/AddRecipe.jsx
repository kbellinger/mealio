import React from 'react'
import { useState, useMemo } from 'react';
import { ActivityIndicator, Alert, Button, Image, View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-paper'
import CategoryButton from './CategoryButton';  
import IngredientInput from './IngredientInput';
import InstructionsInput from './InstructionsInput'; 
import { db, storage } from '../firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage
// import * as ImagePicker from 'expo-image-picker'; 


export default function AddRecipe({ onSubmit }) {
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [instructions, setInstructions] = useState(['']);
    const [selectedCategories, setSelectedCategories] = useState([]);
    // const [selectedImage, setSelectedImage] = useState(null);
    // const [imageUploading, setImageUploading] = useState(false);
    
    // Memoized selectedSet for isSelected
    const selectedSet = useMemo(() => new Set(selectedCategories), [selectedCategories]);
    
    const [formData, setFormData] = useState({
        title: '',
        category: selectedCategories,
        prepTime: 0,
        cookTime: 0,
        servings: 0,
        description: '',
        ingredients: [],
        instructions: [],
    });
    
    const categories = [
      'American', 'Italian', 'Mexican', 'Asian', 'Easy', 'Under 30 min', 'Dinner',
      'Breakfast', 'Lunch', 'Beef', 'Poultry', 'Pork', 'Casserole','Drinks', 'Side',
      'Dessert', 'Gluten Free', 'Low Calorie', 'Snacks', 'Family', 'Kids'
    ];
  
    const toggleCategory = (category) => {
      setSelectedCategories((prevSelected) =>
        prevSelected.includes(category)
          ? prevSelected.filter((item) => item !== category) // Deselect category
          : [...prevSelected, category] // Select category
      );
    };
  
    const isSelected = (category) => selectedSet.has(category);
  
    const handleFormChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    

    // Image code that will not work right now because it 
    // costs money to add images to firebase and I am poor.

    // const pickImage = async () => {
    //     // Request permission and open image picker
    //     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (!permissionResult.granted) {
    //       Alert.alert('Permission Denied', 'You need to grant permission to access the media library.');
    //       return;
    //     }
    
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //       quality: 0.5,
    //     });
    
    //     if (!result.canceled) {
    //       setSelectedImage(result.assets[0].uri);
    //     }

    //     console.log("pick image uri", result.assets[0].uri);
    // };
    
    // const uploadImage = async (uri) => {
    //     if (!uri) {
    //       console.error("No URI provided for image upload.");
    //       return null;
    //     }
      
    //     try {
    //       setImageUploading(true);
      
    //       // Fetch the image as a blob
    //       const response = await fetch(uri);
    //       if (!response.ok) {
    //         throw new Error(`Failed to fetch image: ${response.statusText}`);
    //       }
    //       const blob = await response.blob();
      
    //       // Upload to Firebase Storage
    //       const fileName = `recipes/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    //       const imageRef = ref(storage, fileName);
    //       console.log("imageref", imageRef)
    //       console.log("blob", blob)
    //       const snapshot = await uploadBytes(imageRef, blob);
    //       console.log("Upload successful:", snapshot);
    //       console.log("Made it to this spot")
        
    //       return await getDownloadURL(snapshot.ref); // Return the image's URL
          
    //     } catch (error) {
    //       console.error("Image upload error:", error.message, uri);
    //       Alert.alert("Error", `Failed to upload image: ${error.message}`);
    //       console.error("Detailed error:", error); // Check full error payload.
    //     } finally {
    //       setImageUploading(false);
    //     }
    //   };
      
     

    const handleSubmit = async () => {
        try {
        // const imageUploadURL = selectedImage ? await uploadImage(selectedImage) : null;
        const recipeData = {
          ...formData,
          ingredients: ingredients.map(({ name, quantity }) => `${quantity} ${name}`), // Concatenate quantity and name
          instructions,
          categories: selectedCategories,
          createdAt: new Date(), // Add a timestamp
        };
    
        //   let imageURL = null;
        //   if (selectedImage) {
        //     imageURL = await uploadImage(selectedImage);
        //   }
        //   if (imageURL) {
        //     recipeData.imageURL = imageURL; // Add image URL to recipe data
        //   }
    
          // Add recipe to Firestore
          await addDoc(collection(db, 'recipes'), recipeData);
          Alert.alert('Success', 'Recipe added successfully!');
            
          // Reset form after submission
          setFormData({
            title: '',
            prepTime: 0,
            cookTime: 0,
            servings: 0,
            description: '',
          });
          setIngredients([{ name: '', quantity: '' }]);
          setInstructions(['']);
          setSelectedCategories([]);
        //   setSelectedImage(null);
          onSubmit();
        } catch (error) {
          Alert.alert('Error', `Failed to add recipe: ${error.message}`);
        }
      };
  
    return (
      <ScrollView>
        <View>
            <Text variant='bodySmall' style={styles.requiredText}>* = Required</Text>
        <TextInput
          label="Title *"
          mode="outlined"
          placeholder="Teriyaki Chicken"
          onChangeText={(value) => handleFormChange('title', value)}
          value={formData.title}
        />
        <TextInput
          label="Prep Time"
          mode="outlined"
          keyboardType="numeric"
          placeholder="15"
          onChangeText={(value) => handleFormChange('prepTime', value)}
          value={formData.prepTime}
          right={<TextInput.Affix text="minutes" />}
        />
        <TextInput
          label="Cook Time"
          mode="outlined"
          keyboardType="numeric"
          placeholder="30"
          onChangeText={(value) => handleFormChange('cookTime', value)}
          value={formData.cookTime}
          right={<TextInput.Affix text="minutes" />}
        />
        <TextInput
          label="Servings *"
          mode="outlined"
          keyboardType="numeric"
          placeholder="6"
          onChangeText={(value) => handleFormChange('servings', value)}
          value={formData.servings}
        />
        <TextInput
          label="Description *"
          mode="outlined"
          multiline={true}
          placeholder="A delicious easy dinner..."
          onChangeText={(text) => handleFormChange('description', text)}
          value={formData.description}
        />
        </View>
        
        <Text style={styles.title}>Categories</Text>
        <View style={styles.buttonGroup}>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={isSelected}
              toggleCategory={toggleCategory}
            />
          ))}
        </View>
        <Text style={styles.selectedCategoriesText}>
          Selected Categories: {selectedCategories.join(', ')}
        </Text>
        <Text style={styles.title}>Ingredients</Text>
        <Text variant='bodySmall'>Input the ingredient and how much</Text>
        <IngredientInput onIngredientsChange={setIngredients} />
        <InstructionsInput instructions={instructions} setInstructions={setInstructions} />
        {/* <Text style={styles.title}>Image</Text> */}
        {/* <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>Select Image</Text>
        </TouchableOpacity>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imagePreview} />} */}

          
        {/* <Button
            title={imageUploading ? "Uploading Image..." : "Submit Recipe"}
            onPress={handleSubmit}
            disabled={imageUploading}
        />
        {imageUploading && <ActivityIndicator size="large" color="#D9885B" />} */}

        <Button title="Submit Recipe" onPress={handleSubmit} />

      </ScrollView>
    );
  }
  

const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    requiredText: {
        fontStyle:'italic',
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 30
    },
    buttonGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    selectedCategoriesText: {
      marginTop: 16,
      fontSize: 16,
      fontStyle: 'italic',
    },
    addButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        // alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'row'
    },
    addButtonText: {
        color: '#D9885B',
        fontWeight: 'bold',
        fontSize: 18,
    },
    imageButton: {
        backgroundColor: '#D9885B',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      imageButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      imagePreview: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 5,
      },
      
  });