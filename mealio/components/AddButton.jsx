import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, FAB, IconButton, Modal, Portal, Text, useTheme } from 'react-native-paper'
import AntDesign from '@expo/vector-icons/AntDesign';
import AddRecipe from './AddRecipe';


export default function AddButton({ onRecipeAdded }) {
    
    const [modalVisible, setModalVisible] = useState(false);

    // const showModal = () => setVisible(true);
    // const hideModal = () => setVisible(false);

    const handleCloseModalOnSubmit = () => {
        setModalVisible(false); // Close the modal
        onRecipeAdded();       // Notify the parent component
      };

  return (
    <View >
      <Portal>
        <Modal visible={modalVisible} animationType="slide" onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.containerStyle}>
            <Text variant='displaySmall'>Add New Recipe</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <AntDesign name="close" size={36} color="#D9885B" />
            </TouchableOpacity>
            <AddRecipe onSubmit={handleCloseModalOnSubmit}/>
        </Modal>
      </Portal>
      <FAB
        icon='plus'
        color='white'
        mode='flat'
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      />
        
      
    </View>

  )
}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 0,
      backgroundColor: '#D9885B',
      borderRadius:30,
    
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerStyle: {
        backgroundColor: 'white', 
        padding: 20
    },
    
    
  })