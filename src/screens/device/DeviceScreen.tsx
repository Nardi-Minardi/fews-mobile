import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../constants/colors';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  location: string;
  lastSeen: string;
}

const DeviceScreen: React.FC = () => {
  const devices: Device[] = [
    {
      id: '1',
      name: 'Sensor Hub A1',
      type: 'Temperature Sensor',
      status: 'online',
      location: 'Warehouse A',
      lastSeen: '2 minutes ago',
    },
    {
      id: '2',
      name: 'GPS Tracker B2',
      type: 'Location Tracker',
      status: 'online',
      location: 'Vehicle Fleet',
      lastSeen: '5 minutes ago',
    },
    {
      id: '3',
      name: 'Pressure Monitor C3',
      type: 'Pressure Sensor',
      status: 'maintenance',
      location: 'Production Line 1',
      lastSeen: '1 hour ago',
    },
    {
      id: '4',
      name: 'Vibration Sensor D4',
      type: 'Vibration Monitor',
      status: 'offline',
      location: 'Machine Room',
      lastSeen: '2 hours ago',
    },
    {
      id: '5',
      name: 'Humidity Controller E5',
      type: 'Humidity Sensor',
      status: 'online',
      location: 'Storage Area',
      lastSeen: '1 minute ago',
    },
  ];

  const getStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'online':
        return Colors.success;
      case 'offline':
        return Colors.error;
      case 'maintenance':
        return Colors.warning;
      default:
        return Colors.textSecondary;
    }
  };

  const getStatusIcon = (status: Device['status']) => {
    switch (status) {
      case 'online':
        return 'check-circle';
      case 'offline':
        return 'error';
      case 'maintenance':
        return 'build';
      default:
        return 'help';
    }
  };

  const renderDeviceItem = ({ item }: { item: Device }) => (
    <TouchableOpacity style={styles.deviceCard}>
      <View style={styles.deviceHeader}>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceName}>{item.name}</Text>
          <Text style={styles.deviceType}>{item.type}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Icon name={getStatusIcon(item.status)} size={14} color={Colors.white} />
          <Text style={styles.statusText}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.deviceDetails}>
        <View style={styles.detailRow}>
          <Icon name="location-on" size={16} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="access-time" size={16} color={Colors.textSecondary} />
          <Text style={styles.detailText}>Last seen: {item.lastSeen}</Text>
        </View>
      </View>

      <View style={styles.deviceActions}>
        <TouchableOpacity style={styles.actionButtonSmall}>
          <Icon name="settings" size={16} color={Colors.primary} />
          <Text style={styles.actionButtonTextSmall}>Configure</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButtonSmall}>
          <Icon name="analytics" size={16} color={Colors.primary} />
          <Text style={styles.actionButtonTextSmall}>View Data</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Device Management</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{devices.filter(d => d.status === 'online').length}</Text>
          <Text style={styles.statLabel}>Online</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{devices.filter(d => d.status === 'offline').length}</Text>
          <Text style={styles.statLabel}>Offline</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{devices.filter(d => d.status === 'maintenance').length}</Text>
          <Text style={styles.statLabel}>Maintenance</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{devices.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      <FlatList
        data={devices}
        renderItem={renderDeviceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.deviceList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsBar: {
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
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  deviceList: {
    padding: 16,
  },
  deviceCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  deviceType: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  deviceDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  deviceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  actionButtonTextSmall: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default DeviceScreen;
