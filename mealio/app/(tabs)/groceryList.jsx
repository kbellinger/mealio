import React, { useState } from 'react';
import { ScrollView, TextInput, View, StyleSheet } from 'react-native';
import { List, IconButton, } from 'react-native-paper';


export default function GroceryListPage() {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');

  const addItem = () => {
    if (newItemText.trim() !== '') {
      setItems([...items, { id: Date.now().toString(), text: newItemText }]);
      setNewItemText('');
    }
  };

  const updateItem = (id, newText) => {
    setItems(items.map(item => (item.id === id ? { ...item, text: newText } : item)));
  };

  const deleteItem = id => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {items.map(item => (
          <List.Item
            key={item.id}
            title={() => (
              <TextInput
                style={styles.input}
                value={item.text}
                onChangeText={text => updateItem(item.id, text)}
              />
            )}
            right={() => (
              <IconButton
                icon="delete"
                onPress={() => deleteItem(item.id)}
              />
            )}
          />
        ))}
      </ScrollView>

      <View style={styles.newItemContainer}>
        <TextInput
          style={styles.newItemInput}
          placeholder="Add a new item"
          placeholderTextColor="#555"
          value={newItemText}
          onChangeText={setNewItemText}
          onSubmitEditing={addItem}
          returnKeyType="done"
        />
        <IconButton icon="plus" onPress={addItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // paddingVertical: 1,
    fontSize: 18,
    color: '#000',
  },
  newItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  newItemInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 2,
    fontSize: 18,
    color: '#000',
  },
  
});