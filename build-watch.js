const esbuild = require('esbuild');
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

let contexts = [];

async function buildAll() {
  // Dispose existing contexts
  await Promise.all(contexts.map(c => c.dispose()));
  contexts = [];

  const componentsDir = path.resolve(__dirname, 'src/components');
  const files = fs.readdirSync(componentsDir)
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(componentsDir, f));

  contexts = await Promise.all(files.map(file => {
    const name = path.basename(file, '.js');
    return esbuild.context({
      entryPoints: [file],
      bundle: true,
      outfile: `_site/js/${name}.js`,
      format: 'esm',
      minify: true,
    });
  }));

  await Promise.all(contexts.map(c => c.watch()));

  console.log('Watching components:', files);
}

async function start() {
  await buildAll();

  const watcher = chokidar.watch('src/components', {
    ignoreInitial: true,
  });

  watcher.on('add', async (file) => {
    console.log(`File added: ${file}, rebuilding...`);
    await buildAll();
  });

  watcher.on('unlink', async (file) => {
    console.log(`File removed: ${file}, rebuilding...`);
    await buildAll();
  });

  process.on('SIGINT', async () => {
    console.log('Stopping watch...');
    await Promise.all(contexts.map(c => c.dispose()));
    process.exit();
  });
}

start().catch(console.error);