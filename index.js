const app = require('./config/express-config')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;


 app.get('/', function(req, res){
  res.writeHead(200,{'Content-Type': 'text/html'})

   return res.end('./app/index.html');

 })
 server.listen(port)

 io.on('connection', function (socket) {

    socket.emit('conexao', { user: socket.id});

   
    socket.on('disconnect', function () {
      io.emit('disconnect');
      console.log("desconetado")
    });

    socket.on('ordem', function (data) {
      console.log(data)
      socket.broadcast.emit('ordem',data)
    });


    socket.on('exclusao', function (data) {
      console.log(data)
      socket.broadcast.emit('exclusao',data)
    });
});



 console.log('Servidor rodando na portar :'+ port)
 
