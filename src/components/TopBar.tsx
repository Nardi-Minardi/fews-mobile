import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';

interface TopBarProps {
  title: string;
  navigation: any;
}

const TopBar: React.FC<TopBarProps> = ({title, navigation}) => {
  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View style={styles.content}>
        {canGoBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Icon name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconButton} />
        )}
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.iconButton}>
          <Icon name="menu" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingTop: StatusBar.currentHeight || 0,
  },
  content: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default TopBar;
