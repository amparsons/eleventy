const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function buildAll() {
  const componentsDir = path.resolve(__dirname, 'src/components');
  const files = fs.readdirSync(componentsDir)
    .filter(f => f.endsWith('.js'));

  const entryPoints = files.map(f => path.join(componentsDir, f));

  await esbuild.build({
    entryPoints,
    bundle: true,
    outdir: '_site/js',
    format: 'esm',
    minify: true,
    splitting: true,
    sourcemap: true,
  });

  console.log('Built all components:', files);
}

buildAll().catch(console.error);