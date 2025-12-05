import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useSensors, SensorItem } from '../../../hooks/useSensors';
import moment from 'moment';

interface SensorListProps {
  deviceUid?: string | null;
  initialLimit?: number;
}

const SensorList: React.FC<SensorListProps> = ({ deviceUid, initialLimit = 50 }) => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(initialLimit);
  const { data, isFetching, isInitialLoading } = useSensors(deviceUid, { offset, limit });
  const [items, setItems] = useState<SensorItem[]>([]);

  // Reset list on device change
  useEffect(() => {
    setOffset(0);
    setItems([]);
  }, [deviceUid]);

  // Append new page when data changes for current offset
  useEffect(() => {
    if (!data) return;
    const page = data.sensors || [];
    setItems(prev => (offset === 0 ? page : [...prev, ...page]));
  }, [data, offset]);

  const hasMore = useMemo(() => {
    const total = data?.total_data || 0;
    return offset + limit < total;
  }, [data, offset, limit]);

  const loadMore = () => {
    if (isFetching || !hasMore) return;
    setOffset(prev => prev + limit);
  };

  const renderItem = ({ item }: { item: SensorItem }) => {
    const time = item.last_sending_data ? moment(item.last_sending_data).format('YYYY-MM-DD HH:mm:ss') : '-';
    return (
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name || 'Sensor'}</Text>
          <Text style={styles.meta}>{time}</Text>
        </View>
        <Text style={styles.value}>
          {Number.isFinite(Number(item.value)) ? `${Number(item.value)}${item.unit ? ` ${item.unit}` : ''}` : '-'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Sensor</Text>
      <FlatList
        data={items}
        keyExtractor={(it, idx) => `${it.id}-${idx}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 12 }}
        ListEmptyComponent={
          !(isFetching || isInitialLoading) ? (
            <View style={styles.empty}><Text style={styles.meta}>Tidak ada data</Text></View>
          ) : null
        }
        ListFooterComponent={
          hasMore ? (
            <TouchableOpacity onPress={loadMore} style={styles.moreBtn} disabled={isFetching}>
              <Text style={styles.moreText}>{isFetching ? 'Memuat…' : 'Tampilkan Lebih Banyak'}</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, marginBottom: 16 },
  header: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  name: { fontSize: 14, fontWeight: '600', color: Colors.text },
  meta: { fontSize: 12, color: Colors.textSecondary },
  value: { fontSize: 14, fontWeight: '700', color: Colors.primary, marginLeft: 8 },
  moreBtn: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    marginTop: 8,
  },
  moreText: { color: Colors.white, fontWeight: '600' },
  empty: { backgroundColor: Colors.white, borderRadius: 10, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
});

export default SensorList;
