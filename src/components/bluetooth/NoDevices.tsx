import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoDevices: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Mis dispositivos</Text>
    <View style={styles.card}>
      <Text style={styles.noDevices}>¡No tienes dispositivos registrados!</Text>
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
  noDevices: {
    color: '#b0b0b0',
    fontSize: 16,
  },
});

export default NoDevices; 