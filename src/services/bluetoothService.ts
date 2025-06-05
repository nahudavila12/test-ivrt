import { BleManager, Device as BleDevice, Subscription, Characteristic } from 'react-native-ble-plx';
import { parseBalanceHexString } from '../parsers/balanceParser';
import { parseDinamometroHexString } from '../parsers/dinamometroParser';
import { parseFreeChargeString } from '../parsers/freechargeParser';

export type ValkyriaDeviceType = 'Valkyria Platform' | 'Valkyria Dynamometer' | 'Valkyria Free Charge 5';

export interface ValkyriaDevice {
  id: string;
  name: string;
  type: ValkyriaDeviceType;
  bleDevice: BleDevice;
}

export class BluetoothService {
  private manager: BleManager;
  private scanSubscription: Subscription | null = null;
  private connectedDevice: BleDevice | null = null;
  private dataSubscription: Subscription | null = null;

  constructor() {
    this.manager = new BleManager();
  }

  // Escanear dispositivos Valkyria
  scanForDevices(onDeviceFound: (device: ValkyriaDevice) => void, onError: (error: Error) => void) {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        onError(error);
        return;
      }
      if (device && device.name && device.name.startsWith('Valkyria')) {
        const type = this.getDeviceType(device.name);
        if (type) {
          onDeviceFound({ id: device.id, name: device.name, type, bleDevice: device });
        }
      }
    });
  }

  stopScan() {
    this.manager.stopDeviceScan();
  }

  async connectToDevice(device: ValkyriaDevice, onData: (data: any) => void, onDisconnect: () => void) {
    try {
      this.connectedDevice = await device.bleDevice.connect();
      await this.connectedDevice.discoverAllServicesAndCharacteristics();
      // Suscribirse a todas las características notificables
      const services = await this.connectedDevice.services();
      for (const service of services) {
        const characteristics = await service.characteristics();
        for (const char of characteristics) {
          if (char.isNotifiable) {
            this.dataSubscription = char.monitor((error, characteristic) => {
              if (error) return;
              if (characteristic?.value) {
                const raw = Buffer.from(characteristic.value, 'base64').toString('hex');
                const parsedArr = this.parseData(device.type, raw);
                if (parsedArr && parsedArr.length > 0) {
                  // Tomar el último dato parseado
                  onData(parsedArr[parsedArr.length - 1]);
                } else {
                  onData(null);
                }
              }
            });
          }
        }
      }
      this.connectedDevice.onDisconnected(onDisconnect);
    } catch (e) {
      onDisconnect();
    }
  }

  disconnect() {
    this.dataSubscription?.remove();
    this.dataSubscription = null;
    if (this.connectedDevice) {
      this.connectedDevice.cancelConnection();
      this.connectedDevice = null;
    }
  }

  // Detectar tipo de dispositivo por nombre
  private getDeviceType(name: string): ValkyriaDeviceType | null {
    if (/balance/i.test(name)) return 'Valkyria Platform';
    if (/pushpull|dynamometer/i.test(name)) return 'Valkyria Dynamometer';
    if (/free ?charge|libre/i.test(name)) return 'Valkyria Free Charge 5';
    return null;
  }

  // Despachar al parser correcto
  private parseData(type: ValkyriaDeviceType, raw: string) {
    switch (type) {
      case 'Valkyria Platform':
        return parseBalanceHexString(raw);
      case 'Valkyria Dynamometer':
        return parseDinamometroHexString(raw);
      case 'Valkyria Free Charge 5':
        return parseFreeChargeString(raw);
      default:
        return [];
    }
  }
}

export const bluetoothService = new BluetoothService(); 