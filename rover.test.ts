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
