import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SavedDevice } from '../../types/bluetooth';

interface SavedDevicesProps {
  devices: SavedDevice[];
  onSelect: (device: SavedDevice) => void;
  onAddDevice: () => void;
}

const getLogo = (type: string) => {
  switch (type.toLowerCase()) {
    case 'balance':
      return require('../../../assets/logos/balance.png');
    case 'polea':
      return require('../../../assets/logos/polea.png');
    case 'pushpull':
      return require('../../../assets/logos/pushpull.png');
    case 'barra':
      return require('../../../assets/logos/barra.png');
    default:
      return require('../../../assets/logos/otro.png');
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'conectado':
      return '#2563eb';
    case 'disponible':
      return '#b0b0b0';
    case 'no disponible':
      return '#444';
    default:
      return '#b0b0b0';
  }
};

const SavedDevices: React.FC<SavedDevicesProps> = ({ devices, onSelect, onAddDevice }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Mis dispositivos</Text>
      <TouchableOpacity style={styles.addButton} onPress={onAddDevice}>
        <Text style={styles.addButtonText}>+ Agregar dispositivo</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      data={devices}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity style={[styles.card, { borderColor: getStatusColor(item.status) }]} onPress={() => onSelect(item)} disabled={item.status === 'no disponible'}>
          <Image source={getLogo(item.type)} style={styles.logo} resizeMode="contain" />
          <Text style={styles.deviceName}>{item.name}</Text>
          <Text style={[styles.status, { color: getStatusColor(item.status) }]}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#181A20',
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  list: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#23242a',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    width: 140,
    borderWidth: 2,
  },
  logo: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  deviceName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  status: {
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 4,
  },
});

export default SavedDevices; 