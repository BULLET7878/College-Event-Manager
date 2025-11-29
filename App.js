import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { EventsProvider } from './src/context/EventsContext';
import { UserProvider } from './src/context/UserContext';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <EventsProvider>
          <UserProvider>
            <NavigationContainer>
              <AppNavigator />
              <StatusBar style="auto" />
            </NavigationContainer>
          </UserProvider>
        </EventsProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
