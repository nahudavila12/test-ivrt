import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import NoDevices from '../components/bluetooth/NoDevices';
import DeviceSearch from '../components/bluetooth/DeviceSearch';
import DevicesFound from '../components/bluetooth/DevicesFound';
import SavedDevices from '../components/bluetooth/SavedDevices';
import DeviceDetail from '../components/bluetooth/DeviceDetail';
import DeviceManageScreen from '../components/bluetooth/DeviceManageScreen';
import ModalMessage from '../components/bluetooth/ModalMessage';
import ModalTare from '../components/bluetooth/ModalTare';
import BleDebugScreen from './BleDebugScreen';
import { SavedDevice, BluetoothAction } from '../types/bluetooth';
import { bluetoothService, ValkyriaDevice, ValkyriaDeviceType } from '../services/bluetoothService';
import { solicitarPermisosBluetooth } from '../services/useBluetoothPermissions';
import { tare, getRealForce, isTared } from '../services/tareService';

// Estados posibles del flujo
// 'noDevices', 'searching', 'found', 'saved', 'detail', 'manage'
type ScreenState = 'noDevices' | 'searching' | 'found' | 'saved' | 'detail' | 'manage';

const DevicesScreen: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('saved');
  const [foundDevices, setFoundDevices] = useState<ValkyriaDevice[]>([]);
  const [savedDevices, setSavedDevices] = useState<SavedDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<SavedDevice | null>(null);
  const [manageDevice, setManageDevice] = useState<SavedDevice | null>(null);
  const [modal, setModal] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });
  const [isScanning, setIsScanning] = useState(false);
  const [showTareModal, setShowTareModal] = useState(false);
  const [showBleDebug, setShowBleDebug] = useState(false);
  const [tareLoading, setTareLoading] = useState(false);
  const [tareError, setTareError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [lastRawForce, setLastRawForce] = useState<number>(0);
  const [realForce, setRealForce] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDeviceType, setConnectedDeviceType] = useState<ValkyriaDeviceType | null>(null);

  // Escaneo BLE real
  useEffect(() => {
    if (screen === 'searching') {
      setFoundDevices([]);
      setIsScanning(true);
      bluetoothService.scanForDevices(
        (device) => {
          setFoundDevices((prev) => {
            if (prev.find((d) => d.id === device.id)) return prev;
            return [...prev, device];
          });
        },
        (error) => {
          setModal({ visible: true, message: 'Error de Bluetooth: ' + error.message });
          setIsScanning(false);
        }
      );
      return () => bluetoothService.stopScan();
    }
    bluetoothService.stopScan();
    setIsScanning(false);
  }, [screen]);

  // Handler: parar búsqueda
  const handleStopSearch = () => {
    bluetoothService.stopScan();
    setIsScanning(false);
    if (foundDevices.length === 0) {
      setModal({ visible: true, message: 'No se encontró ningún dispositivo Valkyria. ¿Está encendido y con batería?' });
      setScreen(savedDevices.length > 0 ? 'saved' : 'noDevices');
    } else {
      setScreen('found');
    }
  };

  // Handler: seleccionar dispositivo encontrado
  const handleSelectFound = (device: ValkyriaDevice) => {
    bluetoothService.connectToDevice(
      device,
      (parsedData) => {
        if (!parsedData) return;
        setConnectedDeviceType(device.type);
        if (device.type === 'Valkyria Platform') {
          setLastRawForce(parsedData.fuerza1);
          setRealForce(getRealForce(parsedData.fuerza1));
          setLogs((prev) => [
            ...prev.slice(-49),
            `${device.name} | F1: ${parsedData.fuerza1?.toFixed(2)} | F2: ${parsedData.fuerza2?.toFixed(2)} | ${parsedData.timestampStr}`
          ]);
        } else if (device.type === 'Valkyria Dynamometer' || device.type === 'Valkyria Free Charge 5') {
          setLastRawForce(parsedData.valor);
          setRealForce(getRealForce(parsedData.valor));
          setLogs((prev) => [
            ...prev.slice(-49),
            `${device.name} | Valor: ${parsedData.valor?.toFixed(2)} | ${parsedData.timestampStr}`
          ]);
        }
      },
      () => {
        setModal({ visible: true, message: 'Dispositivo desconectado.' });
        setIsConnected(false);
      }
    );
    // Guardar el dispositivo como disponible
    const newSaved: SavedDevice = {
      id: device.id,
      name: device.name,
      type: device.type as any,
      status: 'disponible',
      registeredAt: new Date().toLocaleDateString(),
      code: device.id,
      info: device.name,
    };
    setSavedDevices((prev) => [...prev, newSaved]);
    setScreen('saved');
    setIsConnected(true);
  };

  // Handler: agregar nuevo dispositivo
  const handleAddDevice = async () => {
    const permisosOk = await solicitarPermisosBluetooth((msg) => setModal({ visible: true, message: msg }));
    if (permisosOk) {
      setScreen('searching');
    }
  };

  // Handler: seleccionar dispositivo guardado para detalle
  const handleSelectSaved = (device: SavedDevice) => {
    setSelectedDevice(device);
    setScreen('detail');
  };

  // Handler: ir a pantalla de gestión
  const handleManageDevice = (device: SavedDevice) => {
    setManageDevice(device);
    setScreen('manage');
  };

  // Handler: volver de gestión
  const handleBackFromManage = () => setScreen('saved');

  // Handler: eliminar dispositivo
  const handleDeleteDevice = () => {
    if (manageDevice) {
      setSavedDevices((prev) => prev.filter((d) => d.id !== manageDevice.id));
      setManageDevice(null);
      setScreen(savedDevices.length > 1 ? 'saved' : 'noDevices');
    }
  };

  // Handler: acciones de gestión
  const handleAction = (action: BluetoothAction) => {
    if (action === 'destarar') {
      setShowTareModal(true);
    } else if (action === 'bleDebug') {
      setShowBleDebug(true);
    } else {
      setModal({ visible: true, message: `Acción: ${action}` });
    }
  };

  // Handler: cerrar modal
  const handleCloseModal = () => setModal({ visible: false, message: '' });

  // Handler: volver de detalle
  const handleBackFromDetail = () => setScreen('saved');

  // Handler: instalar nuevo dispositivo desde pantalla de guardados
  const handleInstallNew = () => setScreen('searching');

  // Handler para ejecutar tare
  const handleTareConfirm = async (samples: number) => {
    setTareLoading(true);
    setTareError(null);
    try {
      await tare(async () => lastRawForce, samples);
      setShowTareModal(false);
      setModal({ visible: true, message: '¡Destarado exitosamente!' });
    } catch (e) {
      setTareError('Error al destarar. Intenta de nuevo.');
    }
    setTareLoading(false);
  };

  // Botón universal para volver a la lista de guardados
  const BackToSavedButton = () => (
    <TouchableOpacity style={styles.backButton} onPress={() => setScreen('saved')}>
      <Text style={styles.backButtonText}>Volver a mis dispositivos</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {showBleDebug ? (
        <BleDebugScreen
          logs={logs}
          realForce={realForce}
          isConnected={isConnected}
          onBack={() => setShowBleDebug(false)}
        />
      ) : (
        <>
          {screen === 'noDevices' && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <NoDevices />
              <TouchableOpacity style={styles.addButton} onPress={handleAddDevice}>
                <Text style={styles.addButtonText}>Agregar dispositivo</Text>
              </TouchableOpacity>
            </View>
          )}
          {screen === 'searching' && (
            <>
              <DeviceSearch onStop={handleStopSearch} foundCount={foundDevices.length} />
              <BackToSavedButton />
            </>
          )}
          {screen === 'found' && (
            <>
              <DevicesFound devices={foundDevices} onSelect={handleSelectFound} />
              <BackToSavedButton />
            </>
          )}
          {screen === 'saved' && (
            <>
              <SavedDevices
                devices={savedDevices}
                onSelect={handleSelectSaved}
                onAddDevice={handleInstallNew}
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddDevice}>
                <Text style={styles.addButtonText}>Agregar dispositivo</Text>
              </TouchableOpacity>
            </>
          )}
          {screen === 'detail' && selectedDevice && (
            <>
              <DeviceDetail
                device={selectedDevice}
                onBack={handleBackFromDetail}
                onDelete={() => handleManageDevice(selectedDevice)}
                onAction={handleAction}
              />
              <BackToSavedButton />
            </>
          )}
          {screen === 'manage' && manageDevice && (
            <>
              <DeviceManageScreen
                device={manageDevice}
                onBack={handleBackFromManage}
                onDelete={handleDeleteDevice}
                onAction={handleAction}
              />
              <BackToSavedButton />
            </>
          )}
          <ModalTare
            visible={showTareModal}
            onCancel={() => setShowTareModal(false)}
            onConfirm={handleTareConfirm}
          />
          <ModalMessage visible={modal.visible} message={modal.message} onClose={handleCloseModal} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  addButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#23242a',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginVertical: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default DevicesScreen; 