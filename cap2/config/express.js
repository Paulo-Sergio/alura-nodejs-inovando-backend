var express = require('express');
var load = require('express-load');

module.exports = function () {
    console.log('modulo express sendo carregado');

    var app = express();
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //carregamentos automaticos [rotas e infra]
    load('routes', { cwd: 'app' })
        .then('infra')
        .into(app);

    return app;
}