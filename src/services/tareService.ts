let offset: number | null = null;

export async function tare(getRawForce: () => Promise<number>, muestras: number): Promise<void> {
  const values: number[] = [];
  for (let i = 0; i < muestras; i++) {
    const val = await getRawForce();
    values.push(val);
    await delay(50); // 50ms entre muestras
  }
  offset = values.reduce((a, b) => a + b, 0) / values.length;
}

export function getRealForce(rawValue: number): number {
  if (offset === null) return rawValue;
  return rawValue - offset;
}

export function isTared(): boolean {
  return offset !== null;
}

export function resetTare(): void {
  offset = null;
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
} 