import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const IngredientInput = React.memo(({ onIngredientsChange }) => {
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);

  const handleIngredientChange = useCallback(
    (value, index, field) => {
      const updatedIngredients = [...ingredients];
      updatedIngredients[index][field] = value;

      // Concatenate name and quantity for database format
      const concatenatedIngredients = updatedIngredients.map(
        (ingredient) => `${ingredient.quantity} ${ingredient.name}`.trim()
      );

      setIngredients(updatedIngredients);
      onIngredientsChange(concatenatedIngredients); // Send to parent
    },
    [ingredients, onIngredientsChange]
  );

  const addIngredient = useCallback(() => {
    setIngredients((prev) => [...prev, { name: '', quantity: '' }]);
  }, []);

  const removeIngredient = useCallback(
    (index) => {
      const updatedIngredients = ingredients.filter((_, i) => i !== index);

      // Update the concatenated ingredients array
      const concatenatedIngredients = updatedIngredients.map(
        (ingredient) => `${ingredient.quantity} ${ingredient.name}`.trim()
      );

      setIngredients(updatedIngredients);
      onIngredientsChange(concatenatedIngredients);
    },
    [ingredients, onIngredientsChange]
  );

  return (
    <View style={styles.container}>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.inputRow}>
          <TextInput
            label={`Ingredient ${index + 1}`}
            mode='outlined'
            value={ingredient.name}
            onChangeText={(text) => handleIngredientChange(text, index, 'name')}
            style={styles.input}
            placeholder="Sugar"
          />
          <TextInput
            label="Quantity"
            mode='outlined'
            value={ingredient.quantity}
            onChangeText={(text) => handleIngredientChange(text, index, 'quantity')}
            style={[styles.input, styles.quantityInput]}
            placeholder="1 cup"
          />
          <TouchableOpacity onPress={() => removeIngredient(index)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={addIngredient} style={styles.addButton}>
            <FontAwesome6 name="add" size={22} color="#D9885B" style={{paddingRight: 10}}/>
            <Text style={styles.addButtonText}>Add Ingredient</Text>
          </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     marginTop: 30
//   },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
  },
  quantityInput: {
    marginLeft: 8,
  },
  removeButton: {
    backgroundColor: '#ffcccc',
    padding: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
  removeButtonText: {
    color: '#900',
    fontWeight: 'bold',
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,

    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row'
},
addButtonText: {
    color: '#D9885B',
    fontWeight: 'bold',
    fontSize: 18,
},
});

export default IngredientInput;
