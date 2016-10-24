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
}
