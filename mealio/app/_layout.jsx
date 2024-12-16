import * as React from 'react'
import { Stack } from 'expo-router';
import { MD3LightTheme as DefaultTheme, PaperProvider, useTheme } from 'react-native-paper';
import RecipeDetails from './recipe/[id]';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#7CC0F9',
      onPrimary: 'rgb(255, 255, 255)',
      secondary: '#D9885B',
      onSecondary: 'rgb(255, 255, 255',
    },
  };

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
        <Stack >
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="+not-found" />
            
        </Stack>
    </PaperProvider>
    
  );
}
