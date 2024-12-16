import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { List, IconButton, Button, Text } from 'react-native-paper';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import RecipeCard from '../../components/RecipeCard';
import { router } from 'expo-router';

export default function HomePage() {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [cookingFunFact, setCookingFunFact] = useState('Loading a new cooking tip...');

  useEffect(() => {
    const fetchRecentRecipes = async () => {
      try {
        const db = getFirestore();
        const recipesRef = collection(db, 'recipes');
        const q = query(recipesRef, orderBy('createdAt', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);

        const recipes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecentlyAdded(recipes);
      } catch (error) {
        console.error('Error fetching recently added recipes:', error);
      }
    };

    fetchRecentRecipes();
  }, []);

  useEffect(() => {
    // Fetch a random cooking tip from Spoonacular
    const fetchcookingFunFact = async () => {
      try {
        const response = await fetch(
          'https://api.spoonacular.com/food/trivia/random?apiKey=YOUR_API_KEY'
        );
        const data = await response.json();
       setCookingFunFact(data.text || 'No fun facts available right now.');
      } catch (error) {
        console.error('Error fetching cooking tip:', error);
       setCookingFunFact('Failed to load cooking tip. Please try again later.');
      }
    };

    fetchcookingFunFact();
  }, []);

  return (
      <ScrollView style={styles.container}>
        <View style={styles.planSection}>
          <Text variant="headlineLarge">Plan Your Week</Text>
          <Text variant="titleMedium">Organize your meals for the week.</Text>
          <Button
            mode="contained"
            onPress={() => router.push(`/mealPlan/`)}
            style={styles.planButton}
          >
            Start Planning 
          </Button>
          
        </View >
        <View style={styles.recentlyAddedSection}>
          <Text variant="headlineLarge">Recently Added</Text>
          <ScrollView style={styles.sectionContainer} horizontal showsHorizontalScrollIndicator={false}>
          {recentlyAdded.map(recipe => (
            <RecipeCard
              recipe={recipe}
              key={recipe.id}
              onPress={() => router.push(`/recipe/${recipe.id}`)}
            />
          ))}
          </ScrollView>
        </View>
        <View style={styles.tipSection}>
          <Text variant="headlineLarge">Food Fun Fact of the Day</Text>
          <Text style={styles.tipText} variant="titleMedium">{cookingFunFact}</Text>
        </View>
      </ScrollView>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    planSection: {
      marginBottom: 24,
   
    },
    sectionContainer: {
      maxHeight: 370,
    },
    planButton: {
      alignSelf: "flex-start",
      backgroundColor: "#A8B77D",
      marginTop: 6,
      fontSize: 18,
      width: "100%",
    },
    recentlyAddedSection: {
      marginBottom: 24,
    },
    
  });