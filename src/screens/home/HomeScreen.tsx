import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useAtom } from 'jotai';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/colors';

import MapComp from './components/Map';
import DeviceComp from './components/Device';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

import { useDas } from '../../hooks/useDas';
import { dasAtom } from '../../atoms/dasAtom';

import { useDevice } from '../../hooks/useDevice';
import { useMasterInstansi } from '../../hooks/useMaster';
import { deviceAtom } from '../../atoms/deviceAtom';

const HomeScreen: React.FC = () => {
  const { isLoading: isDasLoading, error } = useDas();
  const [dataDas] = useAtom(dasAtom);
  const [dataDevice] = useAtom(deviceAtom);
  const [showModalDevice, setShowModalDevice] = useState(false);

  // Fetch devices
  const deviceQuery = useDevice();
  const masterQuery = useMasterInstansi();

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay
        visible={
          isDasLoading ||
          deviceQuery.isInitialLoading ||
          deviceQuery.isFetching ||
          masterQuery.isInitialLoading ||
          masterQuery.isFetching
        }
        text="Memuat data..."
      />
      {/* Full screen map */}
      <View style={styles.mapWrapper}>
        <MapComp dataDas={dataDas} devices={dataDevice} />

        {/* Floating Button Device */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setShowModalDevice(true)}
        >
          <Icon name="devices" size={26} color="#fff" />
          <Text style={styles.fabText}>Devices</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Device */}
      <DeviceComp
        show={showModalDevice}
        onClose={() => setShowModalDevice(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  mapWrapper: {
    flex: 1,
  },

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

  fabText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '600',
  },
});

export default HomeScreen;
