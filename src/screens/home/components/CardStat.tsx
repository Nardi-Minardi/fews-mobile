import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants/colors';

interface CardStatProps {
  data: {
    id: string | number;
    iconName: string;
    count: number | string;
    label: string;
    color?: string;
  }[];
}

const CardStat: React.FC<CardStatProps> = ({ data }) => {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      {/* Icon tidak menimbulkan warning */}
      <Icon name={item.iconName} size={32} color={item.color || Colors.primary} />

      {/* Pastikan count selalu dalam Text */}
      <Text style={[styles.count, { color: item.color || Colors.primary }]}>
        {item.count != null ? item.count : '-'}
      </Text>

      {/* Label */}
      <Text style={styles.label}>
        {item.label || '-'}
      </Text>
    </View>


  );

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width / 1.5, // 3 cards per screen
    backgroundColor: Colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 7,
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default CardStat;
