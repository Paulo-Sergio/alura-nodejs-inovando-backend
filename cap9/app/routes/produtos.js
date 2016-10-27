module.exports = function (app) {
    app.get('/produtos', function (req, res, next) {
        //pagando conexao
        var connection = app.infra.connectionFactory();
        //consulta
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function (erros, results) {
            if(erros){
                return next(erros);
            }
            res.format({
                html: function () {
                    res.render('produtos/lista', { lista: results });
                },
                json: function () {
                    res.json(results);
                }
            });
        });
        connection.end();
    });

    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form', { errosValidacao: {}, produto: {} });
    });

    app.post('/produtos', function (req, res) {
        var produto = req.body;

        // express validator
        req.assert('titulo', 'Titulo é obrigatório').notEmpty();
        req.assert('preco', 'Formato inválido').isFloat();
        var erros = req.validationErrors();
        if (erros) {
            res.format({
                //status 400 = BadRequest
                html: function () {
                    res.status(400).render('produtos/form', { errosValidacao: erros, produto: produto });
                },
                json: function () {
                    res.status(400.).json(erros);
                }
            });
            return;
        }

        //pagando conexao
        var connection = app.infra.connectionFactory();
        //consulta
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto, function (err, results) {
            res.redirect('/produtos');
        });
    });
}