import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, Modal, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants/colors';
import { useDevice } from '../../../hooks/useDevice';
import { useAtom } from 'jotai';
import { deviceParamsAtom } from '../../../atoms/deviceAtom';
import { useMasterInstansi } from '../../../hooks/useMaster';

interface DeviceCompProps {
  show: boolean;
  onClose: () => void;
  deviceTagId: number;
}

const DeviceComp: React.FC<DeviceCompProps> = ({ show, onClose, deviceTagId }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedInstansi, setSelectedInstansi] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [instansiItems, setInstansiItems] = useState<{ label: string; value: any }[]>([]);

  const [params, setParams] = useAtom(deviceParamsAtom);

  const {
    data: deviceData,
    fetchNextPage: fetchNextDevicePage,
    hasNextPage: hasNextDevicePage,
    searchDevice,
  } = useDevice({ device_tag_id: deviceTagId });

  const {
    data: instansiData,
    fetchNextPage: fetchNextInstansiPage,
    hasNextPage: hasNextMasterInstansiPage,
  } = useMasterInstansi();

  useEffect(() => {
    if (instansiData) {
      const items = [
        { label: 'Semua', value: 'all' },
        ...instansiData.pages.flatMap((page: any) =>
          page.data.map((instansi: any) => ({ label: instansi.name, value: instansi.id }))
        ),
      ];
      setInstansiItems(items);
    }
  }, [instansiData]);

  const filteredDevices = useMemo(() => {
    const all = deviceData?.pages?.flatMap((page: any) => page.data) || [];
    const s = (searchText || '').toLowerCase();
    return all.filter((d: any) =>
      (selectedInstansi === 'all' || !selectedInstansi ? true : d.instansi_id === selectedInstansi) &&
      (s === '' ? true : (d.device_name || '').toLowerCase().includes(s) || (d.device_uid || '').toLowerCase().includes(s))
    );
  }, [deviceData, selectedInstansi, searchText]);

  const renderItem = useCallback(({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.deviceName}>{item.device_name || '-'}</Text>
      <Text style={styles.deviceUid}>{item.device_uid}</Text>
      <Text style={styles.deviceStatus}>Status: {item.device_status || 'Unknown'}</Text>
    </View>
  ), []);
  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  const onSearchChange = (text: string) => {
    setSearchText(text);
    searchDevice(text);
  };

  return (
    <Modal visible={show} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Devices ({filteredDevices.length})</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Cari Perangkat..."
            value={searchText}
            onChangeText={onSearchChange}
            style={styles.searchInput}
          />

          <DropDownPicker
            open={openDropdown}
            value={selectedInstansi}
            items={instansiItems}
            setOpen={setOpenDropdown}
            setValue={setSelectedInstansi}
            setItems={setInstansiItems}
            placeholder="Pilih Instansi"
            listMode="MODAL"
            searchable
            searchPlaceholder="Search instansi..."
            modalTitle="Pilih Instansi"
            containerStyle={{ marginBottom: 12 }}
            modalContentContainerStyle={{
              backgroundColor: Colors.background,
              borderRadius: 12,
              padding: 6,
              paddingBottom: 16,
            }}
            style={{
              borderColor: Colors.border,
              minHeight: 35,
              paddingHorizontal: 12,
              borderRadius: 8,
            }}
            dropDownContainerStyle={{ borderColor: Colors.border }}
            scrollViewProps={{
              onScroll: ({ nativeEvent }) => {
                const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
                const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
                if (isBottom && hasNextMasterInstansiPage) {
                  fetchNextInstansiPage();
                }
              },
              scrollEventThrottle: 200,
            }}
          />

          {/* No tabs here for ARR/AWLR/AWS */}

          <FlatList
            data={filteredDevices}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 16 }}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
            removeClippedSubviews
            updateCellsBatchingPeriod={50}
            ListFooterComponent={
              hasNextDevicePage ? (
                <TouchableOpacity
                  style={{
                    padding: 8,
                    backgroundColor: Colors.primary,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginTop: 8,
                  }}
                  onPress={() => fetchNextDevicePage()}
                >
                  <Text style={{ color: Colors.white, fontWeight: '600' }}>Tampilkan Lebih Banyak </Text>
                </TouchableOpacity>
              ) : null
            }
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', paddingHorizontal: 16 },
  modalContainer: { backgroundColor: Colors.background, borderRadius: 12, maxHeight: '80%', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '600', color: Colors.text },
  searchInput: { borderWidth: 1, borderColor: Colors.border, borderRadius: 8, padding: 8, marginBottom: 12 },
  itemContainer: { backgroundColor: Colors.white, padding: 12, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: Colors.border },
  deviceName: { fontSize: 14, fontWeight: '600', color: Colors.text },
  deviceUid: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  deviceStatus: { fontSize: 12, color: Colors.primary, marginTop: 2 },
});

export default DeviceComp;
