import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text } from 'react-native-paper'



export default function RecipeCard({ recipe, onPress }) {
  const totalTime = parseInt(recipe.prepTime || 0) + parseInt(recipe.cookTime || 0);
  console.log("RecipeCardCondensed Recipe Data:", recipe); // Log the recipe prop

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Title title={recipe?.title || "No Title"} titleVariant='headlineSmall'/>
      <Card.Content>
        {/* <Text variant="bodyMedium">{recipe.categories?.join(', ')}</Text> */}
        <Text variant="bodyMedium">Total Time: {totalTime} mins</Text>
      </Card.Content>
    </Card>

  )
}

const styles = StyleSheet.create({
    card:{
        margin: 10,
        backgroundColor: "white",
    },
  });

