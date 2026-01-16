/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BottomTabNavigator } from './src/navigation/BottomTabNavigator';
import { AppProviders } from './src/plugins';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { Colors } from './src/constants/colors';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    surface: Colors.white,
    onSurface: Colors.text.primary,
    onSurfaceVariant: Colors.text.secondary,
  },
};

function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <BottomSheetModalProvider>
          <AppProviders>
            <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
            <NavigationContainer>
              <BottomTabNavigator />
            </NavigationContainer>
          </AppProviders>
        </BottomSheetModalProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
