export interface DinamometroSample {
  valor: number;
  timestamp: number;
  timestampStr: string;
}

function hexToAscii(hex: string): string {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

function formatTimestamp(ts: number): string {
  const date = new Date(ts);
  return date.toLocaleString('es-ES', { hour12: false }) + '.' + String(date.getMilliseconds()).padStart(3, '0');
}

// Recibe un array de strings hexadecimales
export function parseDinamometroData(datosHex: string[]): DinamometroSample[] {
  let buffer = '';
  let resultados: DinamometroSample[] = [];
  for (const hex of datosHex) {
    const ascii = hexToAscii(hex);
    if (ascii === '\r\n') {
      if (buffer.length > 0) {
        const num = parseFloat(buffer);
        if (!isNaN(num)) resultados.push({ valor: num, timestamp: Date.now(), timestampStr: formatTimestamp(Date.now()) });
        buffer = '';
      }
    } else {
      buffer += ascii;
    }
  }
  return resultados;
}

// Recibe un string hexadecimal largo
export function parseDinamometroHexString(hexString: string): DinamometroSample[] {
  let resultados: DinamometroSample[] = [];
  let buffer = '';
  const ascii = hexToAscii(hexString);
  for (let i = 0; i < ascii.length; i++) {
    const c = ascii[i];
    if (c === '\r' || c === '\n') {
      if (buffer.length > 0) {
        const num = parseFloat(buffer);
        if (!isNaN(num)) {
          resultados.push({ valor: num, timestamp: Date.now(), timestampStr: formatTimestamp(Date.now()) });
        }
        buffer = '';
      }
    } else {
      buffer += c;
    }
  }
  if (buffer.length > 0) {
    const num = parseFloat(buffer);
    if (!isNaN(num)) {
      resultados.push({ valor: num, timestamp: Date.now(), timestampStr: formatTimestamp(Date.now()) });
    }
  }
  return resultados;
} 