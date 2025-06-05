import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface BleDebugScreenProps {
  logs: string[];
  realForce: number | null;
  isConnected: boolean;
  onBack: () => void;
}

const BleDebugScreen: React.FC<BleDebugScreenProps> = ({ logs, realForce, isConnected, onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>{'<'} Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>BLE Debug</Text>
        <View style={[styles.status, { backgroundColor: isConnected ? '#22c55e' : '#ef4444' }]}/>
        <Text style={styles.statusText}>{isConnected ? 'Conectado' : 'Desconectado'}</Text>
      </View>
      <View style={styles.forceBox}>
        <Text style={styles.forceLabel}>Fuerza real:</Text>
        <Text style={styles.forceValue}>{realForce !== null ? realForce.toFixed(2) : '--'}</Text>
      </View>
      <Text style={styles.logTitle}>Log de datos:</Text>
      <ScrollView style={styles.logBox} contentContainerStyle={{ padding: 8 }}>
        {logs.length === 0 ? (
          <Text style={styles.logEmpty}>Sin datos aún...</Text>
        ) : (
          logs.slice(-50).map((log, idx) => (
            <Text key={idx} style={styles.logLine}>{log}</Text>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  backBtn: {
    marginRight: 12,
  },
  backText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  status: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  statusText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
  },
  forceBox: {
    backgroundColor: '#23242a',
    borderRadius: 10,
    marginHorizontal: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  forceLabel: {
    color: '#b0b0b0',
    fontSize: 15,
  },
  forceValue: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 4,
  },
  logTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 4,
  },
  logBox: {
    backgroundColor: '#23242a',
    borderRadius: 10,
    marginHorizontal: 16,
    flex: 1,
  },
  logLine: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  logEmpty: {
    color: '#b0b0b0',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BleDebugScreen; 