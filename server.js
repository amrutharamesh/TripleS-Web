var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
var net = require('net');

//HTTP SERVER
var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;

    console.log(request.url)
    
    if(request.url.indexOf('.html') != -1){
        switch(path){
            case '/home.html':
                 fs.readFile(__dirname + path, function(error, data){
                    if (error){
                        response.writeHead(404);
                        response.write("opps this doesn't exist - 404");
                        response.end();
                    }
                    else{
                        response.writeHead(200, {"Content-Type": "text/html"});
                        response.write(data, "utf8");
                        response.end();
                    }
                });
                break;
            case '/socket.html':
                fs.readFile(__dirname + path, function(error, data){
                    if (error){
                        response.writeHead(404);
                        response.write("opps this doesn't exist - 404");
                        response.end();
                    }
                    else{
                        response.writeHead(200, {"Content-Type": "text/html"});
                        response.write(data, "utf8");
                        response.end();
                    }
                });
                break;
            case '/inventory.html':
                fs.readFile(__dirname + path, function(error, data){
                    if (error){
                        response.writeHead(404);
                        response.write("opps this doesn't exist - 404");
                        response.end();
                    }
                    else{
                        response.writeHead(200, {"Content-Type": "text/html"});
                        response.write(data, "utf8");
                        response.end();
                    }
                });
                break;
            default:
                response.writeHead(404);
                response.write("opps this doesn't exist - 404");
                response.end();
                break;
        }
    }
    if(request.url.indexOf('.css') != -1){
        switch(path){
            case '/app.css' : 
                fs.readFile(__dirname + path, function (err, data) {
                    if (err) console.log(err);
                    response.writeHead(200, {'Content-Type': 'text/css'});
                    response.write(data);
                    response.end();
                });
                break;
            case '/node_modules/bootstrap/dist/css/bootstrap.min.css' : 
                fs.readFile(__dirname + path, function (err, data) {
                    if (err) console.log(err);
                    response.writeHead(200, {'Content-Type': 'text/css'});
                    response.write(data);
                    response.end();
                });
                break;
            case '/node_modules/font-awesome/css/font-awesome.min.css' : 
                fs.readFile(__dirname + path, function (err, data) {
                    if (err) console.log(err);
                    response.writeHead(200, {'Content-Type': 'text/css'});
                    response.write(data);
                    response.end();
                });
                break;
            default:
                response.writeHead(404);
                response.write("opps this doesn't exist - 404");
                response.end();
                break;
        } 
    }
    if(request.url.indexOf('.woff') != -1){
        fs.readFile(__dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.woff2', function (err, data) {
            if (err) console.log(err);
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(data);
            response.end();
        });
    }
    if(request.url.indexOf('.js') != -1){
        switch(path){
            case '/node_modules/bootstrap/dist/js/bootstrap.min.js' :
                fs.readFile(__dirname + path, function (err, data) {
                    if (err) console.log(err);
                    response.writeHead(200, {'Content-Type': 'text/javascript'});
                    response.write(data);
                    response.end();
                });
            break;
            default:
                response.writeHead(404);
                response.write("opps this doesn't exist - 404");
                response.end();
                break;
        }
    }
    
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