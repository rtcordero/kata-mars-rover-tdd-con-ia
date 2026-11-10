// Los dos tests del ciclo 2 pasan; el de girar a la izquierda, que llega en el ciclo 7, falla.
// Se ejecuta aparte, con npm run ejemplo, porque su rojo es a propósito.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ejecutar } from './respuesta-que-se-excede.ts';

test('sin comandos, el rover se queda donde está', () => {
  const rover = { x: 2, y: 3, direccion: 'N' } as const;
  assert.deepEqual(ejecutar(rover, []), { x: 2, y: 3, direccion: 'N' });
});

test('con f, el rover que mira al norte avanza una casilla', () => {
  const rover = { x: 2, y: 3, direccion: 'N' } as const;
  assert.deepEqual(ejecutar(rover, ['f']), { x: 2, y: 4, direccion: 'N' });
});

test('con l, el rover gira a la izquierda sin moverse', () => {
  const rover = { x: 2, y: 3, direccion: 'N' } as const;
  assert.deepEqual(ejecutar(rover, ['l']), { x: 2, y: 3, direccion: 'W' });
});
