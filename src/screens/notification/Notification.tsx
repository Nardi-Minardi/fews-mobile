import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { runNotificationSamples } from '../../services/notificationSamples';
import { Notifications } from '../../services/notifications';
import { toast } from '../../lib/toast';

const Btn: React.FC<{ title: string; onPress: () => void; variant?: 'primary' | 'secondary' }>
  = ({ title, onPress, variant = 'primary' }) => (
  <TouchableOpacity onPress={onPress} style={[styles.btn, variant === 'secondary' ? styles.btnSecondary : styles.btnPrimary]}>
    <Text style={styles.btnText}>{title}</Text>
  </TouchableOpacity>
);

const NotificationScreen: React.FC = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.background }} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.card}>
        <Text style={styles.title}>Notification Samples</Text>
        <Btn title="Basic" onPress={() => Notifications.basic('Judul', 'Pesan sederhana')} />
        <Btn title="Heads Up" onPress={() => Notifications.headsUp('Heads Up', 'Prioritas tinggi')} variant="secondary" />
        <Btn title="Big Text" onPress={() => Notifications.bigText('Big Text', 'Ringkasan', 'Ini contoh teks panjang untuk gaya Big Text pada notifikasi.')} />
        <Btn title="Big Picture" onPress={() => Notifications.bigPicture('Big Picture', 'Lihat gambar', 'https://picsum.photos/600/300')} variant="secondary" />
        <Btn title="Inbox" onPress={() => Notifications.inbox('Inbox', ['Baris 1', 'Baris 2', 'Baris 3'], '3 pembaruan baru')} />
        <Btn title="Progress 60%" onPress={() => Notifications.progress('Progress', 'Sedang memproses…', 60)} variant="secondary" />
        <Btn title="Schedule +5s" onPress={() => Notifications.schedule('Terjadwal', 'Muncul 5 detik lagi', Date.now() + 5000)} />
        <Btn title="Cancel All" onPress={() => Notifications.cancelAll()} variant="secondary" />
        <Btn title="Run All Samples" onPress={() => runNotificationSamples().catch(() => {})} />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Toast Tests</Text>
        <Btn title="Toast Success" onPress={() => toast.success('Berhasil', 'Operasi sukses')} />
        <Btn title="Toast Info" onPress={() => toast.info('Informasi', 'Ini adalah pesan info')} variant="secondary" />
        <Btn title="Toast Error" onPress={() => toast.error('Gagal', 'Terjadi kesalahan')} />
        <Btn title="Toast Custom" onPress={() => toast.show({ type: 'success', text1: 'Custom', text2: 'Teks custom', position: 'top', visibilityTime: 2000 })} variant="secondary" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnPrimary: { backgroundColor: Colors.primary },
  btnSecondary: { backgroundColor: Colors.secondary || '#6c757d' },
  btnText: { color: Colors.white, fontWeight: '600' },
});

export default NotificationScreen;
