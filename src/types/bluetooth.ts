export type DeviceType = 'balance' | 'polea' | 'pushpull' | 'barra' | 'otro';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
}

export interface SavedDevice extends Device {
  status: 'conectado' | 'disponible' | 'no disponible';
  registeredAt: string;
  code: string;
  info: string;
}

export type BluetoothAction = 'destarar' | 'bleDebug' | 'calibrar'; 