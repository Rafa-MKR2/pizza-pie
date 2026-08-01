const express = require('express');
const fs = require('fs');
const app = require('./config/express-config')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  fs.readFile('./app/index.html', 'utf8', function (err, data) {
    if (err) {
      res.writeHead(404);
      return res.end('Página não encontrada');
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
});

server.listen(port, function () {
  console.log('Servidor rodando na porta :' + port);
});

io.on('connection', function (socket) {
  socket.emit('conexao', { user: socket.id });

  socket.on('disconnect', function () {
    console.log('desconectado');
  });

  socket.on('ordem', function (data) {
    socket.broadcast.emit('ordem', data);
  });

  socket.on('exclusao', function (data) {
    socket.broadcast.emit('exclusao', data);
  });
});
