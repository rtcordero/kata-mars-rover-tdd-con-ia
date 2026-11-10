import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ejecutar, type Planeta } from './rover.ts';

const MARTE: Planeta = { ancho: 10, alto: 10 };

test('sin comandos, el rover se queda donde está', () => {
  const rover = { x: 2, y: 3, direccion: 'N' } as const;
  assert.deepEqual(ejecutar(rover, [], MARTE), { x: 2, y: 3, direccion: 'N' });
});

test('con f, el rover que mira al norte avanza una casilla', () => {
  const rover = { x: 2, y: 3, direccion: 'N' } as const;
  assert.deepEqual(ejecutar(rover, ['f'], MARTE), { x: 2, y: 4, direccion: 'N' });
});

test('con varios f, el rover avanza una casilla por cada uno', () => {
  const rover = { x: 2, y: 3, direccion: 'N' } as const;
  assert.deepEqual(ejecutar(rover, ['f', 'f', 'f'], MARTE), { x: 2, y: 6, direccion: 'N' });
});

test('con f, el rover avanza hacia donde mira: este, sur u oeste', () => {
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'E' }, ['f'], MARTE), { x: 3, y: 3, direccion: 'E' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'S' }, ['f'], MARTE), { x: 2, y: 2, direccion: 'S' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'W' }, ['f'], MARTE), { x: 1, y: 3, direccion: 'W' });
});

test('con b, el rover retrocede una casilla sin girarse', () => {
  const rover = { x: 2, y: 3, direccion: 'N' } as const;
  assert.deepEqual(ejecutar(rover, ['b'], MARTE), { x: 2, y: 2, direccion: 'N' });
});

test('con r, el rover gira a la derecha sin moverse', () => {
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'N' }, ['r'], MARTE), { x: 2, y: 3, direccion: 'E' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'E' }, ['r'], MARTE), { x: 2, y: 3, direccion: 'S' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'S' }, ['r'], MARTE), { x: 2, y: 3, direccion: 'W' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'W' }, ['r'], MARTE), { x: 2, y: 3, direccion: 'N' });
});

test('con l, el rover gira a la izquierda sin moverse', () => {
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'N' }, ['l'], MARTE), { x: 2, y: 3, direccion: 'W' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'W' }, ['l'], MARTE), { x: 2, y: 3, direccion: 'S' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'S' }, ['l'], MARTE), { x: 2, y: 3, direccion: 'E' });
  assert.deepEqual(ejecutar({ x: 2, y: 3, direccion: 'E' }, ['l'], MARTE), { x: 2, y: 3, direccion: 'N' });
});

test('el rover sigue los comandos en orden: gira y luego avanza', () => {
  const rover = { x: 2, y: 3, direccion: 'N' } as const;
  assert.deepEqual(ejecutar(rover, ['f', 'r', 'f', 'f'], MARTE), { x: 4, y: 4, direccion: 'E' });
});

test('al cruzar un borde, el rover aparece por el lado contrario', () => {
  assert.deepEqual(ejecutar({ x: 4, y: 9, direccion: 'N' }, ['f'], MARTE), { x: 4, y: 0, direccion: 'N' });
  assert.deepEqual(ejecutar({ x: 4, y: 0, direccion: 'S' }, ['f'], MARTE), { x: 4, y: 9, direccion: 'S' });
  assert.deepEqual(ejecutar({ x: 9, y: 4, direccion: 'E' }, ['f'], MARTE), { x: 0, y: 4, direccion: 'E' });
  assert.deepEqual(ejecutar({ x: 0, y: 4, direccion: 'E' }, ['b'], MARTE), { x: 9, y: 4, direccion: 'E' });
});
