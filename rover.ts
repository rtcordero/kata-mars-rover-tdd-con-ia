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
  const avance = AVANCE[rover.direccion];
  const pasos = comandos.filter((c) => c === 'f').length - comandos.filter((c) => c === 'b').length;
  return {
    direccion: comandos.includes('r')
      ? DERECHA[rover.direccion]
      : comandos.includes('l')
        ? IZQUIERDA[rover.direccion]
        : rover.direccion,
    x: rover.x + avance.x * pasos,
    y: rover.y + avance.y * pasos,
  };
}
