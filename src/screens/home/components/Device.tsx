import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../constants/colors';
import { useDevice, useDeviceTag } from '../../../hooks/useDevice';
import { useAtom } from 'jotai';
import { deviceParamsAtom } from '../../../atoms/deviceAtom';
import { useMasterInstansi } from '../../../hooks/useMaster';
import LoadingOverlay from '../../../components/ui/LoadingOverlay';

interface DeviceCompProps {
  show: boolean;
  onClose: () => void;
  onSelectDevice?: (device: any) => void;
}

const DeviceComp: React.FC<DeviceCompProps> = ({ show, onClose, onSelectDevice }) => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | string>('all');
  const [selectedInstansi, setSelectedInstansi] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [instansiItems, setInstansiItems] = useState<
    { label: string; value: any }[]
  >([]);

  const [params, setParams] = useAtom(deviceParamsAtom);

  // Hooks
  const { data: deviceTagData } = useDeviceTag();
  const {
    data: deviceData,
    fetchNextPage: fetchNextDevicePage,
    hasNextPage: hasNextDevicePage,
    searchDevice,
    isInitialLoading: deviceInit,
    isFetching: deviceFetching,
  } = useDevice();

  const {
    data: instansiData,
    fetchNextPage: fetchNextInstansiPage,
    hasNextPage: hasNextMasterInstansiPage,
    isInitialLoading: masterInit,
    isFetching: masterFetching,
  } = useMasterInstansi();

  // Update dropdown items ketika instansi berubah
  useEffect(() => {
    if (instansiData) {
      const items = [
        { label: 'Semua', value: 'all' },
        ...instansiData.pages.flatMap((page: any) =>
          page.data.map((instansi: any) => ({
            label: instansi.name,
            value: instansi.id,
          })),
        ),
      ];
      setInstansiItems(items);
    }
  }, [instansiData]);

  // Filter devices by instansi, tag, search
  const filteredDevices = useMemo(() => {
    const all = deviceData?.pages?.flatMap((page: any) => page.data) || [];
    const tagId = deviceTagData?.find((tag: any) => tag.name === activeTab)?.id ?? -1;
    const s = (searchText || '').toLowerCase();
    return all.filter((d: any) =>
      (selectedInstansi === 'all' || !selectedInstansi ? true : d.instansi_id === selectedInstansi) &&
      (activeTab === 'all' ? true : d.device_tag_id.includes(tagId)) &&
      (s === '' ? true : (d.device_name || '').toLowerCase().includes(s) || (d.device_uid || '').toLowerCase().includes(s))
    );
  }, [deviceData, selectedInstansi, activeTab, deviceTagData, searchText]);

  const renderItem = useCallback(({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        if (typeof (DeviceComp as any).defaultProps === 'object') {
          // no-op to keep RN bundler happy
        }
        if (onSelectDevice) {
          onSelectDevice(item);
        }
      }}
      style={styles.itemContainer}
    >
      <Text style={styles.deviceName}>{item.device_name || '-'}</Text>
      <Text style={styles.deviceUid}>{item.device_uid}</Text>
      <Text style={styles.deviceStatus}>
        Status: {item.device_status || 'Unknown'}
      </Text>
    </TouchableOpacity>
  ), []);
  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  const onSearchChange = (text: string) => {
    setSearchText(text);
    searchDevice(text); // hit backend
  };

  return (
    <Modal visible={show} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <LoadingOverlay
            visible={deviceInit || deviceFetching || masterInit || masterFetching}
            text="Memuat data perangkat..."
            fullscreen={false}
            blockTouches={false}
          />
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Devices ({filteredDevices.length})</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <TextInput
            placeholder="Cari Perangkat..."
            value={searchText}
            onChangeText={onSearchChange}
            style={styles.searchInput}
          />

          {/* Dropdown Instansi */}
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
                const { layoutMeasurement, contentOffset, contentSize } =
                  nativeEvent;
                const isBottom =
                  layoutMeasurement.height + contentOffset.y >=
                  contentSize.height - 50;
                if (isBottom && hasNextMasterInstansiPage) {
                  fetchNextInstansiPage();
                }
              },
              scrollEventThrottle: 200,
            }}
          />

          {/* Tabs device tag */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'all' && styles.tabButtonActive,
              ]}
              onPress={() => setActiveTab('all')}>
              <Text
                style={
                  activeTab === 'all' ? styles.tabTextActive : styles.tabText
                }>
                All
              </Text>
            </TouchableOpacity>
            {deviceTagData?.map((tag: any) => (
              <TouchableOpacity
                key={tag.id}
                style={[
                  styles.tabButton,
                  activeTab === tag.name && styles.tabButtonActive,
                ]}
                onPress={() => setActiveTab(tag.name)}>
                <Text
                  style={
                    activeTab === tag.name
                      ? styles.tabTextActive
                      : styles.tabText
                  }>
                  {tag.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Device list */}
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
                  <Text style={{ color: Colors.white, fontWeight: '600' }}>
                    Tampilkan Lebih Banyak </Text>
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    maxHeight: '80%',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: '600', color: Colors.text },
  searchInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  tabContainer: { flexDirection: 'row', marginBottom: 12 },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.border,
    marginRight: 8,
  },
  tabButtonActive: { backgroundColor: Colors.primary },
  tabText: { color: Colors.textSecondary, fontSize: 12, fontWeight: '500' },
  tabTextActive: { color: Colors.white, fontSize: 12, fontWeight: '600' },
  itemContainer: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  deviceName: { fontSize: 14, fontWeight: '600', color: Colors.text },
  deviceUid: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  deviceStatus: { fontSize: 12, color: Colors.primary, marginTop: 2 },
});

export default DeviceComp;
