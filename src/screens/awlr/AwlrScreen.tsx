import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAtom } from 'jotai';

import { Colors } from '../../constants/colors';
import { useDas } from '../../hooks/useDas';
import { dasAtom } from '../../atoms/dasAtom';
import { useDevice } from '../../hooks/useDevice';

import MapComp from './components/MapComp';
import DeviceComp from './components/DeviceComp';

const AwlrScreen: React.FC = () => {
  const { isLoading, error } = useDas();
  const [dataDas] = useAtom(dasAtom);
  const [showModalDevice, setShowModalDevice] = useState(false);

  const { data: deviceData } = useDevice({ device_tag_id: 2 });
  const devices = deviceData?.pages?.flatMap((p: any) => p.data) ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapWrapper}>
        <MapComp dataDas={dataDas} devices={devices} />

        <TouchableOpacity style={styles.fab} onPress={() => setShowModalDevice(true)}>
          <Icon name="devices" size={26} color="#fff" />
          <Text style={styles.fabText}>Devices</Text>
        </TouchableOpacity>
      </View>

      <DeviceComp
        deviceTagId={2}
        show={showModalDevice}
        onClose={() => setShowModalDevice(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  mapWrapper: { flex: 1 },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
  },
  fabText: { color: '#fff', fontSize: 14, marginLeft: 6, fontWeight: '600' },
});

export default AwlrScreen;