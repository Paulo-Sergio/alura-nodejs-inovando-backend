var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function () {

    beforeEach(function (done) {
        var connection = express.infra.connectionFactory();
        connection.query("delete from produtos", function (erros, result) {
            if (!erros) {
                done();
            }
        });
    });

    it('#listagem json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#cadastro de novo produto com dados invalidos', function (done) {
        request.post('/produtos')
            .send({
                titulo: "",
                descricao: "novo livro"
            })
            .expect(400, done);
    });

    it('#cadastro de novo produto valido', function (done) {
        request.post('/produtos')
            .send({
                titulo: "titulo novo",
                preco: 20.50,
                descricao: "novo livro"
            })
            .expect(302, done);
    });
});