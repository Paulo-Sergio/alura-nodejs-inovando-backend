module.exports = function (app) {
    app.get('/', function (req, res) {
        var connection = app.infra.connectionFactory();
        var produtoDAO = new app.infra.ProdutosDAO(connection);
        produtoDAO.lista(function (erros, resultados) {
            res.render('home/index', { livros: resultados });
        });
        connection.end();
    });
}