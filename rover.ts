export type Direccion = 'N' | 'E' | 'S' | 'W';
export type Comando = 'f' | 'b' | 'l' | 'r';
export type Posicion = { x: number; y: number };
export type Rover = Posicion & { direccion: Direccion };
export type Planeta = { ancho: number; alto: number; obstaculos: readonly Posicion[] };
export type Informe = Rover & { obstaculo?: Posicion };

const AVANCE: Record<Direccion, Posicion> = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

const DERECHA: Record<Direccion, Direccion> = { N: 'E', E: 'S', S: 'W', W: 'N' };
const IZQUIERDA: Record<Direccion, Direccion> = { N: 'W', W: 'S', S: 'E', E: 'N' };

export function ejecutar(rover: Rover, comandos: readonly Comando[], planeta: Planeta): Informe {
  let actual = rover;
  for (const comando of comandos) {
    const siguiente = aplicar(actual, comando, planeta);
    if (hayObstaculo(siguiente, planeta)) {
      return { ...actual, obstaculo: { x: siguiente.x, y: siguiente.y } };
    }
    actual = siguiente;
  }
  return actual;
}

function aplicar(rover: Rover, comando: Comando, planeta: Planeta): Rover {
  switch (comando) {
    case 'f':
      return desplazar(rover, 1, planeta);
    case 'b':
      return desplazar(rover, -1, planeta);
    case 'r':
      return { ...rover, direccion: DERECHA[rover.direccion] };
    case 'l':
      return { ...rover, direccion: IZQUIERDA[rover.direccion] };
  }
}

function desplazar(rover: Rover, sentido: 1 | -1, planeta: Planeta): Rover {
  const avance = AVANCE[rover.direccion];
  return {
    ...rover,
    x: dentroDelPlaneta(rover.x + avance.x * sentido, planeta.ancho),
    y: dentroDelPlaneta(rover.y + avance.y * sentido, planeta.alto),
  };
}

// El planeta da la vuelta como el tablero del Pac-Man: lo que sale por un lado entra por el contrario.
function dentroDelPlaneta(coordenada: number, medida: number): number {
  return (coordenada + medida) % medida;
}

function hayObstaculo(posicion: Posicion, planeta: Planeta): boolean {
  return planeta.obstaculos.some((obstaculo) => obstaculo.x === posicion.x && obstaculo.y === posicion.y);
}
