export type Direccion = 'N' | 'E' | 'S' | 'W';
export type Comando = 'f' | 'b' | 'l' | 'r';
export type Rover = { x: number; y: number; direccion: Direccion };

const AVANCE: Record<Direccion, { x: number; y: number }> = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

const DERECHA: Record<Direccion, Direccion> = { N: 'E', E: 'S', S: 'W', W: 'N' };
const IZQUIERDA: Record<Direccion, Direccion> = { N: 'W', W: 'S', S: 'E', E: 'N' };

export function ejecutar(rover: Rover, comandos: readonly Comando[]): Rover {
  let actual = rover;
  for (const comando of comandos) {
    const avance = AVANCE[actual.direccion];
    if (comando === 'f') actual = { ...actual, x: actual.x + avance.x, y: actual.y + avance.y };
    if (comando === 'b') actual = { ...actual, x: actual.x - avance.x, y: actual.y - avance.y };
    if (comando === 'r') actual = { ...actual, direccion: DERECHA[actual.direccion] };
    if (comando === 'l') actual = { ...actual, direccion: IZQUIERDA[actual.direccion] };
  }
  return actual;
}
