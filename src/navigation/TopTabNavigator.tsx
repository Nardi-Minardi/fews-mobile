import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '../constants/colors';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import DeviceScreen from '../screens/device/DeviceScreen';
import SensorScreen from '../screens/sensor/SensorScreen';
import ArrScreen from '../screens/arr/ArrScreen';
import AwsScreen from '../screens/aws/AwsScreen';
import AwlrScreen from '../screens/awlr/AwlrScreen';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: Colors.white,
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primary,
          height: 3,
          borderRadius: 2,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        swipeEnabled: false, // bisa geser kiri-kanan
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: "Home" }}
      />

      <Tab.Screen
        name="ArrTab"
        component={ArrScreen}
        options={{ title: "ARR" }}
      />

      <Tab.Screen
        name="AwlrTab"
        component={AwlrScreen}
        options={{ title: "AWLR" }}
      />

      <Tab.Screen
        name="AwsTab"
        component={AwsScreen}
        options={{ title: "AWS" }}
      />

    </Tab.Navigator>
  );
};

export default TopTabNavigator;
