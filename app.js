var express = require('express')
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.set('view engine', 'pug');
app.use(express.static('node_modules'));
app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('home');
});

app.get('/inventory', function(req, res){
	res.render('inventory');
});

app.get('/notifications', function(req, res){
	res.render('notifications');
});

app.get('/index', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

server.listen(2000);
var listener = io.listen(server);
 
listener.sockets.on('connection', function(socket){
 	socket.emit('message', {'message': 'hello world'});
	//send data to client
	setInterval(function(){
		socket.emit('date', {'date': new Date()});
	}, 1000);

 	//recieve client data
   	socket.on('client_data', function(data){
     	process.stdout.write(data.letter);
   	});
	//recieve client data
	socket.on('client_data', function(data){
 		process.stdout.write(data.letter);
	});
});

//TELNET SERVER
var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6971;
// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        var gasValue = data.toString("utf8", 0, data.length - 1);
        console.log(gasValue);
        var spawn = require("child_process").spawn;
        var process = spawn('python',["push.py"]);
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);