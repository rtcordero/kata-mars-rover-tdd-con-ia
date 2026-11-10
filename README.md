# Kata Mars Rover: TDD guiando a un agente de IA

Es el código del artículo [TDD con IA: guía a un agente con la kata Mars Rover](https://rubentejera.com/tdd-con-ia-kata-mars-rover/), que explica cada paso.

Un agente de IA escribe código muy deprisa, y también código que nadie le ha pedido. Este repositorio resuelve la kata Mars Rover con TDD repartiendo el trabajo: la persona escribe o revisa cada test en rojo, el agente propone lo mínimo para pasarlo y la persona lo revisa y refactoriza con los tests en verde.

Lo que demuestra está en el **historial**: un commit por cada fase del ciclo rojo-verde-refactor, y cada commit falla o pasa exactamente como dice su mensaje.

## La kata

Un rover está en un planeta cuadriculado, en una casilla `(x, y)` y mirando a uno de los cuatro puntos cardinales (`N`, `E`, `S`, `W`). Recibe una lista de comandos:

- `f` y `b`: avanzar o retroceder una casilla.
- `l` y `r`: girar a la izquierda o a la derecha, sin moverse.

El planeta da la vuelta por los bordes y puede tener obstáculos: si el siguiente movimiento choca con uno, el rover se queda en la última casilla libre, deja de ejecutar comandos e informa del obstáculo.

El enunciado sigue la versión de [Kata-Log](https://kata-log.rocks/mars-rover-kata). El tamaño del planeta, el origen de las coordenadas y el modelo de los bordes (como el tablero del Pac-Man) son decisiones de este repositorio.

## Cómo ejecutarlo

Necesitas Node.js 24.12 o posterior (la versión fijada está en `.node-version`). Node ejecuta TypeScript directamente, quitando los tipos, así que los tests no necesitan compilar. TypeScript solo se instala para comprobar los tipos.

1. Clona el repositorio, entra en la carpeta e instala las dos dependencias de desarrollo:

   ```bash
   npm ci
   ```

2. Pasa los tests y comprueba los tipos:

   ```bash
   npm test
   npm run check
   ```

3. Recorre el historial de la kata, del primer paso al último:

   ```bash
   git log --oneline --reverse
   git checkout <commit>   # y npm test en cada paso
   git checkout main       # para volver
   ```

## Qué mirar primero

1. El historial: `git log --reverse --format=%s`. Cada mensaje describe el comportamiento del paso y acaba en su fase: `(rojo)`, `(verde)` o `(refactor)`.
2. [`rover.test.ts`](rover.test.ts): los diez tests, que se leen como la especificación del rover.
3. [`rover.ts`](rover.ts): la implementación final, y cómo creció con `git log -p rover.ts`. Algunos verdes parecen trampa a propósito, como sumar `comandos.length`: son lo mínimo para pasar el test de ese paso, y el test siguiente los desmonta.
4. [`scripts/comprobar-historial.sh`](scripts/comprobar-historial.sh): recorre el historial y falla si un commit «(rojo)» pasa, o si uno «(verde)» o «(refactor)» no pasa los tests o la comprobación de tipos. La CI lo ejecuta en cada push; en local, con `npm run test:historial`.

## Versiones

- Node.js 24.21.0 (`.node-version`). Cada commit se ha comprobado también con Node.js 26.13.0, y la CI pasa los tests en las dos versiones.
- TypeScript 7.0.2 y `@types/node` 24.19.2, fijados en `package.json`, solo para comprobar los tipos.
- Tests con `node:test` y `node:assert/strict`, sin librerías.

## Cómo se hizo

Desarrollado con el enfoque [IA Limpia](https://rubentejera.com/que-es-la-ia-limpia/): un agente de IA escribe el código siguiendo los pasos del artículo, los tests validan cada paso y el resultado se revisa y se aprueba a mano antes de publicarlo.

**Las peticiones y respuestas del agente que muestra el artículo son ejemplos construidos**, no transcripciones de una sesión real. Se escribieron para ilustrar qué hacer en cada fase, y el código de la respuesta que se excede se ha ejecutado contra los tests de su paso.

El historial reconstruye los pasos del artículo en su mismo orden, para poder recorrerlos uno a uno. La CI comprueba en cada push que cada rojo falla y cada verde y cada refactor pasan (`npm run test:historial`).

## Licencia

[MIT](LICENSE).
