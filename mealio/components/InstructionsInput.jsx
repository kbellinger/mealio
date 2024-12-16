import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const InstructionsInput = React.memo(({ instructions, setInstructions }) => {
  const handleInstructionChange = useCallback((text, index) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = text;
    setInstructions(updatedInstructions);
  }, [instructions, setInstructions]);

  const addInstruction = useCallback(() => {
    setInstructions((prevInstructions) => [...prevInstructions, '']);
  }, [setInstructions]);

  const removeInstruction = useCallback((index) => {
    setInstructions((prevInstructions) =>
      prevInstructions.filter((_, i) => i !== index)
    );
  }, [setInstructions]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instructions</Text>
      {instructions.map((instruction, index) => (
        <View key={index} style={styles.inputRow}>
          <TextInput
            label={`Step ${index + 1}`}
            mode='outlined'
            value={instruction}
            onChangeText={(text) => handleInstructionChange(text, index)}
            style={styles.input}
            placeholder={`Enter instruction for step ${index + 1}`}
            multiline
          />
          <TouchableOpacity onPress={() => removeInstruction(index)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      
        <TouchableOpacity onPress={addInstruction} style={styles.addButton}>
            <FontAwesome6 name="add" size={22} color="#D9885B" style={{paddingRight: 10}}/>
            <Text style={styles.addButtonText}>Add Step</Text>
        </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
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
});

export default InstructionsInput;
