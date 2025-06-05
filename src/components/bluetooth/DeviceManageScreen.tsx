import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SavedDevice } from '../../types/bluetooth';

interface DeviceManageScreenProps {
  device: SavedDevice;
  onBack: () => void;
  onDelete: () => void;
  onAction: (action: 'destarar' | 'bleDebug' | 'calibrar') => void;
}

const DeviceManageScreen: React.FC<DeviceManageScreenProps> = ({ device, onBack, onDelete, onAction }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onBack} style={styles.backBtn}>
      <Text style={styles.backText}>{'<'} Volver</Text>
    </TouchableOpacity>
    <View style={styles.card}>
      <Text style={styles.deviceName}>{device.name}</Text>
      <Text style={styles.info}>Tipo: {device.type}</Text>
      <Text style={styles.info}>Estado: {device.status}</Text>
      <Text style={styles.info}>Registrado: {device.registeredAt}</Text>
      <Text style={styles.info}>Código: {device.code}</Text>
      <Text style={styles.info}>Info: {device.info}</Text>
      <TouchableOpacity style={styles.actionBtn} onPress={() => onAction('destarar')}><Text style={styles.actionText}>Destarar</Text></TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={() => onAction('bleDebug')}><Text style={styles.actionText}>BLE debug</Text></TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={() => onAction('calibrar')}><Text style={styles.actionText}>Calibrar</Text></TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}><Text style={styles.deleteText}>Desinstalar</Text></TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    alignItems: 'center',
    paddingTop: 24,
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 8,
  },
  backText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#23242a',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  deviceName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  info: {
    color: '#b0b0b0',
    fontSize: 14,
    marginBottom: 4,
  },
  actionBtn: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginVertical: 4,
    width: '100%',
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: '#23242a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff4d4f',
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
  },
  deleteText: {
    color: '#ff4d4f',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DeviceManageScreen; 