import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper';
import * as React from 'react'


export default function HomePage() {
  const theme = useTheme();
  return (
      <View style={styles.container}>
        <Text>Home Page</Text>
        {/* <Link href={'/recipeLibrary'}>Recipe Library</Link> */}
        {/* <Link href={'/mealPlan'}>Meal Plan</Link>
        <Link href={'/groceryList'}>Grocery List</Link> */}

      </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
  });