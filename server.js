var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

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
  //send data to client
  setInterval(function(){
    socket.emit('date', {'date': new Date()});
  }, 1000);

  //recieve client data
  socket.on('client_data', function(data){
    process.stdout.write(data.letter);
  });
});