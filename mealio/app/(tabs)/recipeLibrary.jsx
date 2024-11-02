import React from 'react'
import { Link } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { Searchbar, Text } from 'react-native-paper'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RecipeCard from '../../components/RecipeCard';

export default function RecipeLibraryPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <View style={styles.container}>
      <Searchbar
    
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <View style={styles.gallery}>
        <Text variant='titleLarge'>
          Recipes
        </Text>
        <View>
        <Link href={'../recipePage'}>
          <RecipeCard/>
        </Link>
          <RecipeCard/>
          <RecipeCard/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gallery: {
    flex: 1,
    height: hp('70%'), // 70% of height device screen
    width: wp('80%'),   // 80% of width device screen
    padding: 10,
    
  },
  grid: {

  }

});