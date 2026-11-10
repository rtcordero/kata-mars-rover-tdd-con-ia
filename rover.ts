export type Direccion = 'N' | 'E' | 'S' | 'W';
export type Comando = 'f' | 'b' | 'l' | 'r';
export type Rover = { x: number; y: number; direccion: Direccion };
export type Planeta = { ancho: number; alto: number };

const AVANCE: Record<Direccion, { x: number; y: number }> = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

const DERECHA: Record<Direccion, Direccion> = { N: 'E', E: 'S', S: 'W', W: 'N' };
const IZQUIERDA: Record<Direccion, Direccion> = { N: 'W', W: 'S', S: 'E', E: 'N' };

export function ejecutar(rover: Rover, comandos: readonly Comando[], planeta: Planeta): Rover {
  let actual = rover;
  for (const comando of comandos) actual = aplicar(actual, comando);
  return actual;
}

function aplicar(rover: Rover, comando: Comando): Rover {
  switch (comando) {
    case 'f':
      return desplazar(rover, 1);
    case 'b':
      return desplazar(rover, -1);
    case 'r':
      return { ...rover, direccion: DERECHA[rover.direccion] };
    case 'l':
      return { ...rover, direccion: IZQUIERDA[rover.direccion] };
  }
}

function desplazar(rover: Rover, sentido: 1 | -1): Rover {
  const avance = AVANCE[rover.direccion];
  return { ...rover, x: rover.x + avance.x * sentido, y: rover.y + avance.y * sentido };
}
