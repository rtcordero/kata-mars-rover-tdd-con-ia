#!/usr/bin/env bash
# Recorre el historial y comprueba que cada paso de la kata hace lo que dice su mensaje:
# los commits «(rojo)» tienen que fallar, y los «(verde)» y «(refactor)», pasar los tests
# y la comprobación de tipos. Además, un «(verde)» no puede tocar los tests. Los demás se saltan.
# Solo comprueba que un rojo falla, no por qué falla.
set -euo pipefail

raiz=$(git rev-parse --show-toplevel)
copia="$(git rev-parse --absolute-git-dir)/comprobar-historial"
tsc="$raiz/node_modules/.bin/tsc"
errores=0

if [ ! -x "$tsc" ]; then
  echo "Falta TypeScript: ejecuta antes npm ci"
  exit 1
fi

# Limpia una copia que haya quedado de una ejecución interrumpida.
git -C "$raiz" worktree remove --force "$copia" 2>/dev/null || true
rm -rf "$copia"
git -C "$raiz" worktree prune
git -C "$raiz" worktree add --quiet --detach "$copia" HEAD
trap 'git -C "$raiz" worktree remove --force "$copia"' EXIT
# Las dependencias son las mismas en todo el historial: se comparten con la copia.
ln -s "$raiz/node_modules" "$copia/node_modules"

for commit in $(git -C "$raiz" rev-list --reverse HEAD); do
  asunto=$(git -C "$raiz" log -1 --format=%s "$commit")
  case "$asunto" in
    *'(rojo)') esperado=falla ;;
    *'(verde)' | *'(refactor)') esperado=pasa ;;
    *) continue ;;
  esac
  git -C "$copia" checkout --quiet "$commit"
  obtenido=falla
  if (cd "$copia" && node --test >/dev/null 2>&1); then
    obtenido=pasa
    if [ "$esperado" = pasa ] && ! (cd "$copia" && "$tsc" -p . >/dev/null 2>&1); then
      obtenido="pasa los tests, pero no la comprobación de tipos"
    fi
  fi
  if [[ "$asunto" == *'(verde)' ]] && ! git -C "$raiz" diff --quiet "$commit^" "$commit" -- '*.test.ts'; then
    obtenido="$obtenido, pero modifica los tests"
  fi
  if [ "$obtenido" = "$esperado" ]; then
    echo "ok    ${commit:0:7} $asunto"
  else
    echo "MAL   ${commit:0:7} $asunto: se esperaba que $esperado y $obtenido"
    errores=$((errores + 1))
  fi
done

if [ "$errores" -gt 0 ]; then
  echo "$errores commits no hacen lo que dice su mensaje"
  exit 1
fi
