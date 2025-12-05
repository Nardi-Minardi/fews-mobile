import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/colors';
import DeviceComp from './components/Device';
import SensorChart from './components/SensorChart';
import SensorList from './components/SensorList';
import { useSensors } from '../../hooks/useSensors';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

const SensorScreen: React.FC = () => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any | null>(null);

  const { data: sensorsResp, isFetching, isInitialLoading } = useSensors(selectedDevice?.device_uid);

  const readings = sensorsResp?.sensors ?? [];
  const unit = readings[0]?.unit || '';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.background }} contentContainerStyle={{ paddingBottom: 20 }}>
      <LoadingOverlay visible={isInitialLoading || isFetching} text="Memuat data sensor..." />
      <View style={{ padding: 16 }}>
        <TouchableOpacity
          style={[styles.pickBtn, (isFetching) && styles.pickBtnDisabled]}
          onPress={() => !isFetching && setPickerOpen(true)}
          disabled={isFetching}
        >
          <Icon name="search" size={20} color={Colors.white} />
          <Text style={styles.pickBtnText}>
            {selectedDevice ? `${selectedDevice.device_name} ` : 'Pilih Device'}
          </Text>
        </TouchableOpacity>

        {!selectedDevice && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Pilih device terlebih dahulu</Text>
          </View>
        )}
      </View>

      {selectedDevice && (
        <SensorChart
          title={`Monitoring ${selectedDevice.device_name || ''}`}
          readings={readings}
          unit={unit}
        />
      )}

      {selectedDevice && (
        <SensorList deviceUid={selectedDevice.device_uid} />
      )}

      <DeviceComp
        show={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelectDevice={(device) => {
          setSelectedDevice(device);
          setPickerOpen(false);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  pickBtnDisabled: { opacity: 0.6 },
  pickBtnText: { color: Colors.white, fontWeight: '600', marginLeft: 8 },
  emptyBox: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  emptyText: { color: Colors.textSecondary },
});

export default SensorScreen;