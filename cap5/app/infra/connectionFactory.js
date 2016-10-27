//driver
var mysql = require('mysql');

var connectMYSQL = function() {
    console.log('agora sim, estou conectando no mysql')
    //criando conexao
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'casadocodigo_nodejs'
    });
};

module.exports = function () {
    console.log('express load me chamando');
    return connectMYSQL;
}