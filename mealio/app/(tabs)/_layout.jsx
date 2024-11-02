import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs 
        screenOptions={{ 
            tabBarShowLabel: false, 
            tabBarInactiveTintColor: 'white', 
            tabBarInactiveBackgroundColor: '#7CC0F9', 
            tabBarActiveTintColor: '#7CC0F9',
            headerShadowVisible: false,
        }}
    >
        <Tabs.Screen 
            name="index" 
            options={{ 
                title: 'Mealio', 
                tabBarIcon:({ color }) => <FontAwesome size={28} name="home" color={color} /> 
            }}
        />
        <Tabs.Screen 
            name="recipeLibrary" 
            options={{ 
                title: 'Recipes', 
                tabBarIcon:({ color }) => <MaterialIcons name="library-books" size={24} color={color} /> 
            }}
        />
      <Tabs.Screen name="mealPlan" options={{ title: 'Meal Plan', tabBarIcon:({ color }) => <FontAwesome name="calendar" size={24} color={color} /> }}/>
      <Tabs.Screen name="groceryList" options={{ title: 'Grocery List', tabBarIcon:({ color }) => <FontAwesome name="shopping-basket" size={24} color={color} /> }}/>
      <Tabs.Screen name="userAccount" options={{ title: 'Account', tabBarIcon:({ color }) => <FontAwesome name="user-circle-o" size={24} color={color} /> }}/>
    </Tabs>
  );
}
