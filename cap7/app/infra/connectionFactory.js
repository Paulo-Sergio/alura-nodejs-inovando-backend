//driver
var mysql = require('mysql');

var connectMYSQL = function () {
    console.log('agora sim, estou conectando no mysql')
    //criando conexao
    if (!process.env.NODE_ENV) {
        //não definio variavel - estamos em PROD
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo_nodejs'
        });
    }

    if (process.env.NODE_ENV == 'test') {
        //conexao de DEV
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo_nodejs_test'
        });
    }
};

module.exports = function () {
    console.log('express load me chamando');
    return connectMYSQL;
}