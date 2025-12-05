import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../constants/colors';

const AccountScreen: React.FC = () => {
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@ffewfms.com',
    role: 'System Administrator',
    department: 'IT Operations',
    joinDate: 'January 2023',
    avatar: 'JD',
  };

  const menuItems = [
    {
      id: '1',
      title: 'Profile Settings',
      subtitle: 'Update your personal information',
      icon: 'person',
      action: () => Alert.alert('Profile Settings', 'Navigate to profile settings'),
    },
    {
      id: '2',
      title: 'Security',
      subtitle: 'Change password and security settings',
      icon: 'security',
      action: () => Alert.alert('Security', 'Navigate to security settings'),
    },
    {
      id: '3',
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      icon: 'notifications',
      action: () => Alert.alert('Notifications', 'Navigate to notification settings'),
    },
    {
      id: '4',
      title: 'Data & Privacy',
      subtitle: 'Manage your data and privacy settings',
      icon: 'privacy-tip',
      action: () => Alert.alert('Data & Privacy', 'Navigate to privacy settings'),
    },
    {
      id: '5',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      icon: 'help',
      action: () => Alert.alert('Help & Support', 'Navigate to help center'),
    },
    {
      id: '6',
      title: 'About',
      subtitle: 'App version and information',
      icon: 'info',
      action: () => Alert.alert('About FFEWFMS', 'Version 0.0.1\nFleet and Field Equipment Workforce Management System'),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => Alert.alert('Logged out', 'You have been logged out successfully') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{userProfile.avatar}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <Text style={styles.userEmail}>{userProfile.email}</Text>
            <Text style={styles.userRole}>{userProfile.role}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* User Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Devices Managed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>156</Text>
            <Text style={styles.statLabel}>Sensors Monitored</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>99.8%</Text>
            <Text style={styles.statLabel}>Uptime</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Icon name={item.icon as any} size={20} color={Colors.primary} />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Information */}
        <View style={styles.accountInfo}>
          <Text style={styles.accountInfoTitle}>Account Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Department:</Text>
            <Text style={styles.infoValue}>{userProfile.department}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Member since:</Text>
            <Text style={styles.infoValue}>{userProfile.joinDate}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Account status:</Text>
            <View style={styles.statusBadge}>
              <Icon name="check-circle" size={14} color={Colors.success} />
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={20} color={Colors.error} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>FFEWFMS v0.0.1</Text>
          <Text style={styles.copyrightText}>© 2025 Flood Early Warning and Flood Monitoring System</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  editButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  menuContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  accountInfo: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  accountInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: Colors.success,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  logoutContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  logoutButtonText: {
    color: Colors.error,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  versionText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
});

export default AccountScreen;
