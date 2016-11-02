var app = require('./config/express')();

/*para o IO Socket*/
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

http.listen(3000, function () {
    console.log('servidor rodando');
});