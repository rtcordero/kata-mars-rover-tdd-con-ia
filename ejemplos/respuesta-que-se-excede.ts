// Ejemplo construido del artículo (ciclo 2): la respuesta de un agente que se adelanta y
// resuelve la kata entera. Pasa los dos tests de su paso y tsc, pero al girar a la izquierda
// desde el norte devuelve direccion: undefined. No forma parte de la solución.
import type { Comando, Direccion, Rover } from '../rover.ts';

export function ejecutar(rover: Rover, comandos: readonly Comando[]): Rover {
  let { x, y, direccion } = rover;
  for (const comando of comandos) {
    if (comando === 'f' || comando === 'b') {
      const paso = comando === 'f' ? 1 : -1;
      if (direccion === 'N') y += paso;
      if (direccion === 'S') y -= paso;
      if (direccion === 'E') x += paso;
      if (direccion === 'W') x -= paso;
    } else {
      const direcciones: Direccion[] = ['N', 'E', 'S', 'W'];
      const giro = comando === 'r' ? 1 : -1;
      direccion = direcciones[(direcciones.indexOf(direccion) + giro) % 4];
    }
  }
  return { x, y, direccion };
}
