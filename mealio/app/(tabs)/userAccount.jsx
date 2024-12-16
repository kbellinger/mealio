import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button, Divider } from 'react-native-paper';

export default function UserAccountPage() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://via.placeholder.com/150',
        }}
      />
      <Text style={styles.name}>Jane Doe</Text>
      <Text style={styles.email}>janedoe@example.com</Text>
      <Divider style={styles.divider}/>
      <Button style={styles.editProfile} mode="contained" onPress={() => console.log('Edit Profile')}>
        Edit Profile
      </Button>
      <Button mode="outlined" textColor="#A8B77D" style={styles.logoutButton} onPress={() => console.log('Logout')}>
        Logout
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 16,
    backgroundColor: '#ccc',

  },
  editProfile: {
    backgroundColor: "#A8B77D",
  },
  logoutButton: {
    marginTop: 10,
  },
});