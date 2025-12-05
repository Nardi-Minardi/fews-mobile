import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import DeviceScreen from '../screens/device/DeviceScreen';
import SensorScreen from '../screens/sensor/SensorScreen';
import NotificationScreen from '../screens/notification/Notification';

// Import navigators
import TopTabNavigator from './TopTabNavigator';

// Import components
import TopBar from '../components/TopBar';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const insets = useSafeAreaInsets();

  // Default padding internal Drawer = 16 horizontal + 16 vertical
  const offsetHorizontal = 16;
  const offsetVertical = 16;

  return (
    <DrawerContentScrollView
      {...props}
      style={styles.drawerContainer}
      contentContainerStyle={{
        padding: 0,        // hapus padding default
        margin: 0,
      }}
    >

      {/* HEADER */}
      <View
        style={[
          styles.drawerHeader,
          {
            paddingTop: insets.top + 16,

            // FIX ke semua sisi
            marginLeft: -offsetHorizontal,
            marginRight: -offsetHorizontal,
            marginTop: -offsetVertical,
            marginBottom: 0,

            paddingHorizontal: offsetHorizontal,
          },
        ]}
      >
        <Text style={styles.logoText}>FFEWFMS</Text>
        <Text style={styles.subtitle}>Flood Early Warning and Monitoring System</Text>
        <Text style={styles.version}>v0.0.1</Text>
      </View>

      {/* ITEMS */}
      <View
        style={{
          paddingHorizontal: 0,
          paddingVertical: 10,
          flex: 1,
          backgroundColor: Colors.white,
          gap: 10, // jarak antar item
        }}
      >
        {props.state.routes.map((route: any, index: number) => {
          const focused = props.state.index === index;

          return (
            <View
              key={route.key}
              style={{
                borderRadius: 10,
                overflow: 'hidden', // wajib
              }}
            >
              <Pressable
                android_ripple={{ color: Colors.primary + '33' }}
                onPress={() => props.navigation.navigate(route.name)}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  backgroundColor: focused ? Colors.primary : 'transparent',
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: focused ? '700' : '500',
                    color: focused ? Colors.white : Colors.text,
                  }}
                >
                  {props.descriptors[route.key].options.title || route.name}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>


      {/* FOOTER */}
      <View
        style={{
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          marginLeft: -offsetHorizontal,
          marginRight: -offsetHorizontal,
          marginBottom: -offsetVertical,   // hilangin space putih bawah
          backgroundColor: Colors.white,
        }}
      >
        <Text style={styles.footerText}>
          © 2025 Flood Early Warning and Flood Monitoring System
        </Text>
      </View>

    </DrawerContentScrollView>
  );
};


const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      // Atur background drawer (jika ingin putih body dan header warna primary, biarkan)
      screenOptions={{
        header: ({ navigation }) => <TopBar title={'FFEWFMS'} navigation={navigation} />,
        // jika ingin lebar drawer custom: drawerStyle: { width: 300 },
        drawerLabelStyle: { fontSize: 12 },
      }}
    >
      <Drawer.Screen name="HomeTabs" component={TopTabNavigator} options={{ title: 'Home' }} />
      <Drawer.Screen name="Device" component={DeviceScreen} options={{ title: 'Device Management' }} />
      <Drawer.Screen name="Sensor" component={SensorScreen} options={{ title: 'Sensor Monitoring' }} />
      <Drawer.Screen name="Notification" component={NotificationScreen} options={{ title: 'Notification & Toast Tests' }} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    // warna full header
    backgroundColor: Colors.primary,
    // paddingHorizontal di-set dinamis di component
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logoContainer: {
    marginBottom: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.white + 'CC',
    marginBottom: 4,
  },
  version: {
    fontSize: 10,
    color: Colors.white + '99',
  },
  drawerItems: {
    flex: 1,
    backgroundColor: Colors.white, // body drawer
  },
  drawerFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
  },
  footerText: {
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default DrawerNavigator;
