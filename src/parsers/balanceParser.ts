export interface BalanceSample {
  fuerza1: number;
  fuerza2: number;
  timestamp: number;
  timestampStr: string;
}

function formatTimestamp(ts: number): string {
  const date = new Date(ts);
  return date.toLocaleString('es-ES', { hour12: false }) + '.' + String(date.getMilliseconds()).padStart(3, '0');
}

/**
 * Parsea una cadena hexadecimal recibida de la plataforma Balance 80Hz.
 * Cada paquete válido es: 4c3aHH1LL1HH2LL2 (12 caracteres hex)
 * Donde HH1,LL1 = fuerza1, HH2,LL2 = fuerza2 (little endian), fuerza = valor / 10.0
 * Este parser es exclusivo para la versión 80Hz (plataforma normal).
 * Ignora bloques corruptos o incompletos.
 * Ahora es tolerante a errores de transmisión: acepta bloques que empiecen en '4c3a' o '3a02'.
 */
export function parseBalanceHexString(hexString: string): BalanceSample[] {
  const umbralOutlier = 200;
  const pares: BalanceSample[] = [];
  if (!hexString || typeof hexString !== 'string') {
    return pares;
  }
  const cleanHex = hexString.replace(/\s+/g, '').toLowerCase();
  for (let i = 0; i <= cleanHex.length - 12; i++) {
    const bloque = cleanHex.substr(i, 12);
    if ((bloque.startsWith('4c3a') || bloque.startsWith('3a02')) && bloque.length === 12) {
      try {
        const h1 = bloque.substr(4, 2);
        const l1 = bloque.substr(6, 2);
        const h2 = bloque.substr(8, 2);
        const l2 = bloque.substr(10, 2);
        const valor1 = (parseInt(l1, 16) << 8) | parseInt(h1, 16);
        const valor2 = (parseInt(l2, 16) << 8) | parseInt(h2, 16);
        const fuerza1 = valor1 / 10.0;
        const fuerza2 = valor2 / 10.0;
        if (Math.abs(fuerza1) > umbralOutlier || Math.abs(fuerza2) > umbralOutlier) {
          continue;
        }
        const ts = Date.now();
        const obj: BalanceSample = { fuerza1, fuerza2, timestamp: ts, timestampStr: formatTimestamp(ts) };
        pares.push(obj);
        i += 11;
      } catch (e) {
        // Error al parsear bloque, ignorar
      }
    }
  }
  return pares;
} 