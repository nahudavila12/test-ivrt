import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

interface DeviceSearchProps {
  onStop: () => void;
  foundCount: number;
}

const DeviceSearch: React.FC<DeviceSearchProps> = ({ onStop, foundCount }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Buscando dispositivos</Text>
    <View style={styles.card}>
      <Text style={styles.found}>{foundCount} dispositivo{foundCount !== 1 ? 's' : ''} encontrado{foundCount !== 1 ? 's' : ''}..</Text>
      <Text style={styles.subtitle}>Estamos dando lo mejor, gracias por esperar.</Text>
      <ActivityIndicator size="large" color="#2563eb" style={{ marginVertical: 16 }} />
      <TouchableOpacity style={styles.button} onPress={onStop}>
        <Text style={styles.buttonText}>Parar Búsqueda</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181A20',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#23242a',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  found: {
    color: '#b0b0b0',
    fontSize: 16,
    marginBottom: 8,
  },
  subtitle: {
    color: '#b0b0b0',
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DeviceSearch; 