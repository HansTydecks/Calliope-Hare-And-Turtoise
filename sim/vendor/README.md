# Mitgelieferte Bibliotheken

Der Garten-Simulator lädt nichts von fremden Servern. Diese Dateien liegen fest im Repository:

| Datei | Herkunft | Version | Lizenz |
|---|---|---|---|
| `three.module.min.js` | [three.js](https://github.com/mrdoob/three.js) (`build/three.module.min.js`) | 0.170.0 | MIT |
| `OrbitControls.js` | three.js (`examples/jsm/controls/OrbitControls.js`), Import-Pfad auf `./three.module.min.js` angepasst | 0.170.0 | MIT |
| `lzma-d-min.js` | [LZMA-JS](https://github.com/LZMA-JS/LZMA-JS) (`src/lzma-d-min.js`, nur Entpacken) | 2.3.2 | MIT |
| `ts-tools.js` | [sucrase](https://github.com/alangpierce/sucrase) 3.35.0 + [acorn](https://github.com/acornjs/acorn) 8.14.0 + acorn-walk 8.3.4, mit esbuild als IIFE `TsTools` gebündelt | – | MIT |

`../sim-data.js` (5×5-Symbole und Schrift) wurde aus
[pxt-calliope](https://github.com/microsoft/pxt-calliope) `libs/core/icons.ts` (MIT) und
[codal-core](https://github.com/lancaster-university/codal-core) `source/types/BitmapFont.cpp` (MIT) erzeugt.

`ts-tools.js` neu bauen:

```js
// tsentry.js
import { transform } from 'sucrase';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';
export function stripTypes(code) {
  return transform(code, { transforms: ['typescript'], disableESTransforms: true }).code;
}
export { acorn, walk };
```

```bash
npx esbuild tsentry.js --bundle --minify --format=iife --global-name=TsTools --platform=browser --outfile=ts-tools.js
```
