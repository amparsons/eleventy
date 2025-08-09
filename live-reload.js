const browserSync = require('browser-sync').create();

browserSync.init({
  server: '_site',         // Serve your Eleventy output folder
  files: ['_site/**/*'],   // Watch all files in _site for changes (including your built JS)
  port: 3000,              // You can pick any port you want
  open: false,             // Prevents auto-opening browser if you prefer manual control
  notify: false,
});