import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store';

// Import screens
import HubScreen from './screens/HubScreen';
import ChamberScreen from './screens/ChamberScreen';
import LibraryScreen from './screens/LibraryScreen';
import ConstructScreen from './screens/ConstructScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

// Custom navigation theme matching the dark cathedral aesthetic
const NavigationTheme = {
  dark: true,
  colors: {
    primary: '#D4AF37',
    background: '#0A0A0A',
    card: '#1A1A1A',
    text: '#E8DCC1',
    border: '#2A2A2A',
    notification: '#8B0000',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={NavigationTheme}>
        <Stack.Navigator
          initialRouteName="Hub"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0A0A0A',
              borderBottomWidth: 1,
              borderBottomColor: '#2A2A2A',
              elevation: 0, // Remove shadow on Android
              shadowOpacity: 0, // Remove shadow on iOS
            },
            headerTintColor: '#D4AF37',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            cardStyle: { backgroundColor: '#0A0A0A' },
          }}
        >
          <Stack.Screen 
            name="Hub" 
            component={HubScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Chamber" 
            component={ChamberScreen} 
            options={{ title: 'The Chamber' }}
          />
          <Stack.Screen 
            name="Library" 
            component={LibraryScreen} 
            options={{ title: 'The Library' }}
          />
          <Stack.Screen 
            name="Construct" 
            component={ConstructScreen} 
            options={{ title: 'The Construct' }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
