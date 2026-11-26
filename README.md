# Euskara A1-A2 · app tipo Duolingo

28 unidades (15 de A1 + 13 de A2), cada una con: nota de gramática, vocabulario, frases, diálogos (audio + lectura), pronunciación y test final.
Además: práctica libre generada al azar (conjugaciones, casos, números, horas, formas verbales), repaso de errores, simulacro de examen y guía de gramática.

## Cómo tenerla en el móvil Android

### A) Más rápido: instalarla como app (PWA)
1. Sube esta carpeta a cualquier hosting estático con HTTPS (GitHub Pages, Netlify, Cloudflare Pages…).
2. Abre la URL en **Chrome para Android** → menú ⋮ → **Instalar aplicación**.
   Funciona sin conexión y el micrófono/voz van con el motor de Chrome.

### B) APK con GitHub Actions (sin instalar nada)
1. Crea un repositorio y sube el contenido de esta carpeta. Copia `tools/build-apk.workflow.txt` a `.github/workflows/build-apk.yml`.
2. Pestaña **Actions → Build Android APK → Run workflow**.
3. Descarga el artefacto `euskara-a1-a2-debug-apk` → `app-debug.apk` e instálalo (permite «orígenes desconocidos»).

### C) APK en local (Android Studio)
```bash
npm install
npm run web
npx cap add android
# añade <uses-permission android:name="android.permission.RECORD_AUDIO"/> en android/app/src/main/AndroidManifest.xml
npx cap sync android
npx cap open android    # Build > Build APK(s)
```
La versión APK usa los plugins `@capacitor-community/text-to-speech` y `@capacitor-community/speech-recognition`
(el WebView de Android no trae reconocimiento de voz web).

## Voz y pronunciación
* **Escucha:** síntesis de voz del dispositivo. Si no hay voz en euskera (eu-ES) se usa una voz en castellano de respaldo (pronunciación aproximada).
* **Mejor opción:** grabaciones propias/nativas.
  1. `node tools/export-phrases.js` → crea `phrases.tsv` (clave + texto).
  2. Genera/graba el audio de cada línea y guárdalo como `audio/<clave>.mp3`.
  3. `node tools/make-audio-index.js` → `audio/index.json`. La app lo usará automáticamente.
* **Pronunciación:** el micrófono transcribe lo que dices (eu-ES) y se compara con la frase objetivo (≥ 72 % de similitud = correcto, palabra a palabra en verde/rojo).
  Es un indicador útil, no una evaluación fonética profesional. Si tu dispositivo no reconoce euskera hay modo de autoevaluación.

## Límites a tener en cuenta
* Contenido **original**, basado en el currículo A1-A2 del MCER para euskera. **No es material oficial de HABE** ni garantiza el aprobado:
  practica además con los modelos de examen oficiales y con un profesor/hablante, sobre todo la expresión escrita y oral.
* El simulacro es orientativo (formato, duración y puntuación oficiales los fija HABE).
* Revisa el contenido con un docente de euskera antes de usarlo como única fuente.

## Estructura
`core.js` lógica (probada con Node) · `content_*.js` unidades · `app.js` interfaz · `sw.js` offline · `tools/` utilidades de audio · `test.js`, `smoke.js` pruebas (`npm test`).
