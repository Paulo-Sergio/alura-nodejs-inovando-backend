module.exports = function (app) {
    app.get('/produtos', function (req, res) {
        //pagando conexao
        var connection = app.infra.connectionFactory();
        //consulta
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function (err, results) {
            res.render('produtos/lista', { lista: results });
        });
        connection.end();
    });

    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form');
    });

    app.post('/produtos', function (req, res) {
        var produto = req.body;

        //pagando conexao
        var connection = app.infra.connectionFactory();
        //consulta
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto, function (err, results) {
            res.redirect('/produtos');
        });
    });
}