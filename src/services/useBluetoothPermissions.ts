import { PermissionsAndroid, Platform } from 'react-native';

export async function solicitarPermisosBluetooth(mostrarMensaje: (msg: string) => void) {
  if (Platform.OS === 'android') {
    const permisos = [
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ];

    const resultados = await PermissionsAndroid.requestMultiple(permisos);

    const todosConcedidos = Object.values(resultados).every(
      (estado) => estado === PermissionsAndroid.RESULTS.GRANTED
    );

    if (!todosConcedidos) {
      mostrarMensaje('Debes conceder todos los permisos de Bluetooth y ubicación para usar esta función.');
      return false;
    }
    return true;
  }
  return true;
}
