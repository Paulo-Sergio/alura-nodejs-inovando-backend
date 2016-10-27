module.exports = function (app) {
    app.get('/promocoes/form', function (req, res, next) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function (erros, results) {
            if (erros) {
                return next(erros);
            }
            res.render('promocoes/form', { lista: results });
        });
        connection.end();
    });

    app.post('/promocoes', function (req, res) {
        var promocao = req.body;
        console.log(promocao);
        app.get('io').emit('novaPromocao', promocao);
        res.redirect('promocoes/form');
    });
}