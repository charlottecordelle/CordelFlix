import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import FavoriteScreen from './FavoriteScreen'

const Stack = createStackNavigator();

const App = () => (
 <NavigationContainer>
  <Stack.Navigator initialRouteName="Home">
   <Stack.Screen name="Home" component={HomeScreen} />
   <Stack.Screen name="Detail" component={DetailScreen} />
   <Stack.Screen name="Favorites" component={FavoriteScreen} />
  </Stack.Navigator>
 </NavigationContainer>
);

export default App;