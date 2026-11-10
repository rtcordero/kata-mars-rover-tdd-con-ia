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

test('con b, el rover retrocede una casilla sin girarse', () => {
  const rover = { x: 2, y: 3, direccion: 'N' } as const;
  assert.deepEqual(ejecutar(rover, ['b']), { x: 2, y: 2, direccion: 'N' });
});

test('con r, el rover gira a la derecha sin moverse', () => {
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'N' }, ['r']), { x: 2, y: 3, direccion: 'E' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'E' }, ['r']), { x: 2, y: 3, direccion: 'S' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'S' }, ['r']), { x: 2, y: 3, direccion: 'W' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'W' }, ['r']), { x: 2, y: 3, direccion: 'N' });
});

test('con l, el rover gira a la izquierda sin moverse', () => {
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'N' }, ['l']), { x: 2, y: 3, direccion: 'W' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'W' }, ['l']), { x: 2, y: 3, direccion: 'S' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'S' }, ['l']), { x: 2, y: 3, direccion: 'E' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'E' }, ['l']), { x: 2, y: 3, direccion: 'N' });
});
