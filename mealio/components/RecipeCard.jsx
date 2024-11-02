import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import chickenNuggets from '../assets/chicken_nuggets.jpg'



export default function RecipeCard() {
  return (
    <View style={styles.card}>
        <Card>
            <Card.Cover source={chickenNuggets}/>
            <Card.Content>                    
                <Text variant='titleLarge'>Chicken Nuggets </Text>
                <Text variant='bodyMedium'>Best nuggies ever</Text>
            </Card.Content>
        </Card>
    </View>
  )
}

const styles = StyleSheet.create({
    card:{
        margin: 10,
    },
  });

