import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Device } from './DevicesFound';

interface DeviceDetailProps {
  device: Device & { registeredAt: string; code: string; info: string };
  onBack: () => void;
  onDelete: () => void;
  onAction: (action: 'destarar' | 'bleDebug' | 'calibrar') => void;
}

const getLogo = (type: string) => {
  switch (type.toLowerCase()) {
    case 'Valkyria Platform':
      return require('../../../assets/logos/balance.png');
    case 'Valkyria Free Charge 5':
      return require('../../../assets/logos/polea.png');
    case 'Valkyria Dynamometer':
      return require('../../../assets/logos/pushpull.png');
    case 'Valkyria Free Charge 5':
      return require('../../../assets/logos/barra.png');
    default:
      return require('../../../assets/logos/otro.png');
  }
};

const DeviceDetail: React.FC<DeviceDetailProps> = ({ device, onBack, onDelete, onAction }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onBack} style={styles.backBtn}>
      <Text style={styles.backText}>{'<'} Volver</Text>
    </TouchableOpacity>
    <View style={styles.card}>
      <Image source={getLogo(device.type)} style={styles.logo} resizeMode="contain" />
      <Text style={styles.deviceName}>{device.name}</Text>
      <Text style={styles.registered}>Registrado el: {device.registeredAt}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Código</Text>
        <Text style={styles.value}>{device.code}</Text>
        <Text style={styles.label}>Info</Text>
        <Text style={styles.value}>{device.info}</Text>
      </View>
      <TouchableOpacity style={styles.actionBtn} onPress={() => onAction('destarar')}><Text style={styles.actionText}>Destarar</Text></TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={() => onAction('bleDebug')}><Text style={styles.actionText}>BLE debug</Text></TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={() => onAction('calibrar')}><Text style={styles.actionText}>Calibrar</Text></TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}><Text style={styles.deleteText}>Eliminar</Text></TouchableOpacity>
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
  logo: {
    width: 56,
    height: 56,
    marginBottom: 8,
  },
  deviceName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  registered: {
    color: '#b0b0b0',
    fontSize: 13,
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: '#23242a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '100%',
  },
  label: {
    color: '#b0b0b0',
    fontSize: 13,
    fontWeight: 'bold',
  },
  value: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
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

export default DeviceDetail; 