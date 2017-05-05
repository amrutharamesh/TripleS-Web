var express = require('express')
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var gasValue = '';
var arrayGasVals = [];
var currentSuggestions = [];

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
		socket.emit('notify', {'gasInfo': arrayGasVals});
	}, 1000);
  setInterval(function(){
    socket.emit('suggestion', {'values' : currentSuggestions});
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
        gasValue = data.toString("utf8", 0, data.length - 1);
        arrayGasVals.push({"value" : gasValue, "ts" : Date.now()});
        console.log(gasValue);
        var spawn = require("child_process").spawn;
        var process = spawn('python',["push.py"]);
        currentSuggestions = getRecommendations(gasValue);
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);


var allProducts = [
  {
    "_id": "590c45feea57be9303b5c26c",
    "index": 0,
    "price": "$26.99",
    "about": "Voluptate adipisicing dolore mollit ex laboris.",
    "product": "OxiClean Power Paks",
    "rating": 4,
    "category": "mild"
  },
  {
    "_id": "590c45fe00146a3daca9af93",
    "index": 1,
    "price": "$17.35",
    "about": "Quis est velit sit anim.",
    "product": "Cif Bathroom Mousse",
    "rating": 2,
    "category": "mild"
  },
  {
    "_id": "590c45fe3039804e4048372a",
    "index": 2,
    "price": "$16.63",
    "about": "Amet mollit ea magna deserunt.",
    "product": "Clorox clean up",
    "rating": 1,
    "category": "mild"
  },
  {
    "_id": "590c45fe90eccabbbfebea90",
    "index": 3,
    "price": "$12.95",
    "about": "Ad proident veniam est ea labore.",
    "product": "OxiClean Power Paks",
    "rating": 4,
    "category": "mild"
  },
  {
    "_id": "590c45fe9bae05905d168474",
    "index": 4,
    "price": "$28.13",
    "about": "Esse duis do elit.",
    "product": "Rin",
    "rating": 3,
    "category": "severe"
  },
  {
    "_id": "590c45fede1a31aef364e8ea",
    "index": 5,
    "price": "$21.37",
    "about": "Labore sit veniam. ",
    "product": "Drano Foamer",
    "rating": 5,
    "category": "severe"
  },
  {
    "_id": "590c45fe16840d242de9eced",
    "index": 6,
    "price": "$16.12",
    "about": "Ex cillum elit anim amet nostrud.",
    "product": "Clorox Lestoil",
    "rating": 2,
    "category": "severe"
  },
  {
    "_id": "590c45fea8c4878ecc548c8f",
    "index": 7,
    "price": "$22.04",
    "about": "Occaecat laborum aliqua aute.", 
    "product": "Clorox Lestoil",
    "rating": 4,
    "category": "severe"
  },
  {
    "_id": "590c45fee9aa05635b5da873",
    "index": 8,
    "price": "$24.76",
    "about": "Et consectetur ad dolore labore ad.",
    "product": "Cif Bathroom Mousse",
    "rating": 1,
    "category": "severe"
  },
  {
    "_id": "590c45fe24d62a3ea0ea5d53",
    "index": 9,
    "price": "$25.55",
    "about": "Duis non mollit Lorem duis.",
    "product": "Cleret",
    "rating": 3,
    "category": "medium"
  },
  {
    "_id": "590c45fee86905ae9e3c4010",
    "index": 10,
    "price": "$14.68",
    "about": "Pariatur do cupidatat iquip sint",
    "product": "Rin",
    "rating": 4,
    "category": "severe"
  },
  {
    "_id": "590c45fee7ec5fc74c767b60",
    "index": 11,
    "price": "$25.43",
    "about": "Incididunt magna fugiat amet duis aute nostrud ad.",
    "product": "Spring scent",
    "rating": 4,
    "category": "severe"
  },
  {
    "_id": "590c45fee08f0c0701aa2ac4",
    "index": 12,
    "price": "$21.44",
    "about": "Nisi do quis ipsum nostrud cillum sunt.",
    "product": "Lysol Disinfectant Wipes",
    "rating": 5,
    "category": "medium"
  },
  {
    "_id": "590c45fe7ef34d6774b5b6ff",
    "index": 13,
    "price": "$14.53",
    "about": "Esse consectetur est tempor sint.",
    "product": "Lysol Concentrate Disinfectant",
    "rating": 0,
    "category": "medium"
  },
  {
    "_id": "590c45feb16b3117af9db72e",
    "index": 14,
    "price": "$19.01",
    "about": "Veniam anim ut incididunt ex.",
    "product": "OxiClean MaxForce Spray",
    "rating": 2,
    "category": "severe"
  },
  {
    "_id": "590c45fe58e87d499b65a676",
    "index": 15,
    "price": "$16.11",
    "about": "Occaecat duis nisi ipsum non pariatur et qui.",
    "product": "Glass Cleaner",
    "rating": 0,
    "category": "medium"
  },
  {
    "_id": "590c45fe4106ba48d9c9334f",
    "index": 16,
    "price": "$10.28",
    "about": "In minim esse officia voluptate cupidatat commodo.",
    "product": "Clorox Lestoil",
    "rating": 2,
    "category": "mild"
  },
  {
    "_id": "590c45fe6ff5499f9785eda6",
    "index": 17,
    "price": "$27.63",
    "about": "In ex minim eiusmod anim non proident.",
    "product": "Cif Power Cream",
    "rating": 5,
    "category": "medium"
  },
  {
    "_id": "590c45fea59272d10d7138e0",
    "index": 18,
    "price": "$14.66",
    "about": "Elit Lorem tempor deserunt voluptate.",
    "product": "Goo gone",
    "rating": 4,
    "category": "mild"
  },
  {
    "_id": "590c45fe568db1c296163b46",
    "index": 19,
    "price": "$20.92",
    "about": "Laborum Lorem occaecat enim exercitation eiusmod ut.",
    "product": "Clorox Lestoil",
    "rating": 1,
    "category": "medium"
  },
  {
    "_id": "590c45fe9c52dc0c9e23330e",
    "index": 20,
    "price": "$20.73",
    "about": "Cillum duis commodo minim aute consequat cupidatat.",
    "product": "OxiClean Power Paks",
    "rating": 0,
    "category": "mild"
  },
  {
    "_id": "590c45fe9abb9ca0a8c10360",
    "index": 21,
    "price": "$24.26",
    "about": "Dolore et ullamco pariatur non mollit enim ad. ",
    "product": "Bon Ami Powder cleanser",
    "rating": 3,
    "category": "medium"
  },
  {
    "_id": "590c45fe3eaa59ed431eab05",
    "index": 22,
    "price": "$13.62",
    "about": "Laborum elit elit nulla aliquip nsectetur.",
    "product": "Clorox Lestoil",
    "rating": 3,
    "category": "mild"
  },
  {
    "_id": "590c45fe3c2ce99794a3ad44",
    "index": 23,
    "price": "$25.52",
    "about": "In magna ea ad laboris ex dolor sit esse.",
    "product": "Henco",
    "rating": 0,
    "category": "severe"
  },
  {
    "_id": "590c45fe383141eacdd862cb",
    "index": 24,
    "price": "$15.73",
    "about": "Sint ad est irure aliquip non in duis irure.",
    "product": "Rin",
    "rating": 3,
    "category": "medium"
  },
  {
    "_id": "590c45fe6b487aa64fe293d6",
    "index": 25,
    "price": "$11.27",
    "about": "Qui irure ipsum irure est nulla reprehenderit.",
    "product": "Cif Power Cream",
    "rating": 5,
    "category": "severe"
  },
  {
    "_id": "590c45fe6f2050c5b817c663",
    "index": 26,
    "price": "$26.52",
    "about": "Ut duis ex deserunt laboris pariatur eecat pariatur ut.",
    "product": "Bounty with Dawn",
    "rating": 3,
    "category": "medium"
  },
  {
    "_id": "590c45fe6ce31c8ecc776a5e",
    "index": 27,
    "price": "$26.03",
    "about": "Et aliquip veniam officia culpa dolor.",
    "product": "Henco",
    "rating": 2,
    "category": "severe"
  },
  {
    "_id": "590c45fe5969959ddd90870e",
    "index": 28,
    "price": "$22.60",
    "about": "Irure magna laborum deserunt non do anim velit eiusmod.",
    "product": "Fresh lemon breeze",
    "rating": 5,
    "category": "medium"
  },
  {
    "_id": "590c45fefd18603f603736bf",
    "index": 29,
    "price": "$21.87",
    "about": "Commodo ea duis ea anim. Inllamco deserunt.",
    "product": "Lysol Disinfectant Wipes",
    "rating": 3,
    "category": "severe"
  },
  {
    "_id": "590c45fe6e6f5271fe7ce719",
    "index": 30,
    "price": "$27.17",
    "about": "Enim tempor dolore ea occaecat.",
    "product": "Clorox Lestoil",
    "rating": 4,
    "category": "medium"
  },
  {
    "_id": "590c45fe9144a1be1187ddb2",
    "index": 31,
    "price": "$13.57",
    "about": "Voluptate dolor labore proident.",
    "product": "Glass Cleaner",
    "rating": 5,
    "category": "severe"
  },
  {
    "_id": "590c45fe22e24749fd0785f7",
    "index": 32,
    "price": "$18.66",
    "about": "Lorum ipsum gainum",
    "product": "Cleret",
    "rating": 4,
    "category": "medium"
  }
];

function getRecommendations(value){
  var suggestions = [];
  if(value > 185 && value < 400){
    for(var i=0; i<allProducts.length;i++){
      if(allProducts[i].category == 'medium'){
        suggestions.push(allProducts[i]);
      }
    }
  }else if(value > 185){
    for(var i=0; i<allProducts.length;i++){
      if(allProducts[i].category == 'severe'){
        suggestions.push(allProducts[i]);
      }
    }
  }else{
    for(var i=0; i<allProducts.length;i++){
      if(allProducts[i].category == 'mild'){
        suggestions.push(allProducts[i]);
      }
    }
  }
  return suggestions;
}