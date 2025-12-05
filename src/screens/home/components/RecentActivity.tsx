import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants/colors';

interface ActivityItem {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  time: string;
  color?: string;
}

interface Props {
  data: ActivityItem[];
}

const RecentActivity: React.FC<Props> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>

      {data.map(item => (
        <View key={item.id} style={styles.activityItem}>
          <Icon
            name={item.icon}
            size={20}
            color={item.color || Colors.primary}
          />

          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>{item.title}</Text>
            <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
          </View>

          <Text style={styles.activityTime}>{item.time}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  activityItem: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  activitySubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default RecentActivity;
