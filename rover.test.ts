import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ejecutar } from './rover.ts';

test('sin comandos, el rover se queda donde está', () => {
  const rover = { x: 2, y: 3, direccion: 'N' } as const;
  assert.deepEqual(ejecutar(rover, []), { x: 2, y: 3, direccion: 'N' });
});

test('con f, el rover que mira al norte avanza una casilla', () => {
  const rover = { x: 2, y: 3, direccion: 'N' } as const;
  assert.deepEqual(ejecutar(rover, ['f']), { x: 2, y: 4, direccion: 'N' });
});

test('con varios f, el rover avanza una casilla por cada uno', () => {
  const rover = { x: 2, y: 3, direccion: 'N' } as const;
  assert.deepEqual(ejecutar(rover, ['f', 'f', 'f']), { x: 2, y: 6, direccion: 'N' });
});

test('con f, el rover avanza hacia donde mira: este, sur u oeste', () => {
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'E' }, ['f']), { x: 3, y: 3, direccion: 'E' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'S' }, ['f']), { x: 2, y: 2, direccion: 'S' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'W' }, ['f']), { x: 1, y: 3, direccion: 'W' });
});
