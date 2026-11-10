export type Direccion = 'N' | 'E' | 'S' | 'W';
export type Comando = 'f' | 'b' | 'l' | 'r';
export type Rover = { x: number; y: number; direccion: Direccion };

export function ejecutar(rover: Rover, comandos: readonly Comando[]): Rover {
  return rover;
}
