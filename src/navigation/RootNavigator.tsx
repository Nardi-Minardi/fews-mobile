import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

// Import navigators
import DrawerNavigator from './DrawerNavigator';
import BottomTabNavigator from './BottomTabNavigator';

// Import components
import TopBar from '../components/TopBar';

const Stack = createNativeStackNavigator();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
