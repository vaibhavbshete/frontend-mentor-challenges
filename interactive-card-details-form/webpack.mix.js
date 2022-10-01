const mix = require('laravel-mix');

mix.disableNotifications().setPublicPath('public');

mix.css('./src/main.css', 'main.css').options({
    processCssUrls: false
});;

mix.js('./src/main.js', 'main.js').vue();

mix.browserSync({
    server: {
        baseDir: '.',
        index:'index.html'
    },
    files: [
        '.src/main.js',
        './src/main.css.',
        './index.html'
    ]
});