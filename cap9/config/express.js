var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function () {
    console.log('modulo express sendo carregado');

    var app = express();

    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());

    //carregamentos automaticos [rotas e infra]
    load('routes', { cwd: 'app' })
        .then('infra')
        .into(app);

    //criando meu propio middleware 404 (not found)
    app.use(function (req, res, next) {
        res.status(404).render('erros/404');
        next();
    });
    //criando meu propio middleware 500 (internal error server)
    app.use(function (error, req, res, next) {
        res.status(500).render('erros/500');
        next();
    });

    return app;
}