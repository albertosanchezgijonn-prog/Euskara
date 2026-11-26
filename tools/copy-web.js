const fs = require('fs'), path = require('path');
const out = path.join(__dirname, '..', 'www');
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
['index.html', 'core.js', 'content_a1a.js', 'content_a1b.js', 'content_a2a.js', 'content_a2b.js', 'app.js', 'sw.js', 'manifest.webmanifest'].forEach(f => fs.copyFileSync(path.join(__dirname, '..', f), path.join(out, f)));
fs.cpSync(path.join(__dirname, '..', 'icons'), path.join(out, 'icons'), { recursive: true });
fs.cpSync(path.join(__dirname, '..', 'audio'), path.join(out, 'audio'), { recursive: true });
console.log('www/ listo');
