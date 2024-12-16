import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const CategoryButton = React.memo(({ category, isSelected, toggleCategory }) => (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected(category) ? styles.selectedButton : styles.unselectedButton,
      ]}
      onPress={() => toggleCategory(category)}
    >
      <Text
        style={[
          styles.buttonText,
          isSelected(category) ? styles.selectedText : styles.unselectedText,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  ));
  
export default CategoryButton;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        margin: 2,
      },
      selectedButton: {
        backgroundColor: '#D9885B', // Highlight color for selected buttons
      },
      unselectedButton: {
        backgroundColor: '#e0e0e0', // Neutral color for unselected buttons
      },
      buttonText: {
        fontSize: 16,
      },
      selectedText: {
        color: '#fff',
      },
      unselectedText: {
        color: '#000',
      },
})