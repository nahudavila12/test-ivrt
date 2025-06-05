export interface FreeChargeSample {
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

/**
 * Parsea una cadena recibida del encoder Free Charge 5 (puede venir en hexadecimal ASCII o texto plano).
 * Devuelve un array de objetos { valor, timestamp, timestampStr }.
 * Filtra outliers: descarta valores con |valor| > 2000.
 */
export function parseFreeChargeString(dataString: string): FreeChargeSample[] {
  let ascii = dataString;
  if (/^[0-9a-fA-F]+$/.test(dataString) && dataString.length % 2 === 0) {
    ascii = hexToAscii(dataString);
  }
  const regex = /(-?\d+(?:\.\d+)?)[TR]/g;
  const resultados: FreeChargeSample[] = [];
  let match;
  while ((match = regex.exec(ascii)) !== null) {
    const valor = parseFloat(match[1]);
    if (!isNaN(valor)) {
      if (Math.abs(valor) > 2000) {
        continue;
      }
      const ts = Date.now();
      const obj: FreeChargeSample = { valor, timestamp: ts, timestampStr: formatTimestamp(ts) };
      resultados.push(obj);
    }
  }
  return resultados;
} 