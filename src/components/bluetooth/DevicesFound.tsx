import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { ValkyriaDevice } from '../../services/bluetoothService';

interface DevicesFoundProps {
  devices: ValkyriaDevice[];
  onSelect: (device: ValkyriaDevice) => void;
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

const DevicesFound: React.FC<DevicesFoundProps> = ({ devices, onSelect }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Dispositivos encontrados</Text>
    <FlatList
      data={devices}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={getLogo(item.type)} style={styles.logo} resizeMode="contain" />
          <Text style={styles.deviceName}>{item.name}</Text>
          <TouchableOpacity style={styles.button} onPress={() => onSelect(item)}>
            <Text style={styles.buttonText}>Seleccionar</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default DevicesFound; 