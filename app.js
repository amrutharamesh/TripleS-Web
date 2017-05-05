var express = require('express')
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var gasValue = '';
var arrayGasVals = [];

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
	}, 100);

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
    "about": "Voluptate adipisicing dolore mollit ex laboris. Eu occaecat nulla nisi aliquip pariatur eu. Mollit laborum anim minim enim cillum incididunt reprehenderit laboris ad in est proident. Aliqua laboris amet aute ad cupidatat proident enim reprehenderit. Elit qui commodo esse dolore minim fugiat. Fugiat et officia officia ea. Nostrud excepteur nostrud veniam sint labore deserunt incididunt laborum incididunt reprehenderit magna.",
    "product": "OxiClean Power Paks",
    "rating": 4,
    "category": "mild"
  },
  {
    "_id": "590c45fe00146a3daca9af93",
    "index": 1,
    "price": "$17.35",
    "about": "Quis est velit sit anim eiusmod duis veniam ex ullamco mollit culpa aliquip aliquip dolor. Incididunt tempor aliquip mollit reprehenderit dolor sunt. Sint anim incididunt ullamco deserunt adipisicing commodo dolor fugiat irure aliquip excepteur est. Aliqua dolore minim veniam mollit qui labore id voluptate officia aute adipisicing commodo magna. Mollit ex occaecat velit non veniam mollit amet eu anim laboris aute adipisicing cupidatat. Qui magna non ipsum laboris sunt eu culpa voluptate ad amet deserunt aliquip Lorem sit. Adipisicing quis eiusmod et eu consequat dolor cillum mollit exercitation do incididunt ad.",
    "product": "Cif Bathroom Mousse",
    "rating": 2,
    "category": "mild"
  },
  {
    "_id": "590c45fe3039804e4048372a",
    "index": 2,
    "price": "$16.63",
    "about": "Amet mollit ea magna deserunt. Et aute do incididunt irure voluptate labore in in ea ea. Non sint minim laboris non enim. Lorem minim excepteur enim qui irure elit do ut reprehenderit proident ex velit. Amet laborum sint dolor ad consequat officia commodo Lorem enim amet ullamco adipisicing in. Pariatur id excepteur est deserunt pariatur sint dolor fugiat proident laborum consectetur anim eu irure.",
    "product": "Clorox clean up",
    "rating": 1,
    "category": "mild"
  },
  {
    "_id": "590c45fe90eccabbbfebea90",
    "index": 3,
    "price": "$12.95",
    "about": "Ad proident veniam est ea labore. Ut irure officia eu eu adipisicing duis. Ut ex qui irure minim exercitation magna eiusmod cupidatat commodo deserunt commodo ex aliqua reprehenderit. Ut occaecat do qui est aliqua ex excepteur labore sit cillum.",
    "product": "OxiClean Power Paks",
    "rating": 4,
    "category": "mild"
  },
  {
    "_id": "590c45fe9bae05905d168474",
    "index": 4,
    "price": "$28.13",
    "about": "Esse duis do elit voluptate aliqua fugiat magna Lorem amet magna dolor veniam nostrud. Duis officia Lorem officia occaecat cupidatat sint officia laboris minim dolore. In adipisicing incididunt nulla tempor laboris sit. Magna amet duis sit mollit dolore dolor. Mollit exercitation nulla enim consectetur duis dolore dolore quis pariatur.",
    "product": "Rin",
    "rating": 3,
    "category": "severe"
  },
  {
    "_id": "590c45fede1a31aef364e8ea",
    "index": 5,
    "price": "$21.37",
    "about": "Labore sit veniam duis qui in excepteur velit commodo reprehenderit. Esse irure sit eiusmod velit ad in. Ipsum aute ullamco voluptate occaecat sit incididunt eiusmod nulla et Lorem commodo incididunt et. Est officia nulla tempor non. Excepteur incididunt irure dolor minim exercitation id esse veniam reprehenderit consequat. Minim eu culpa quis quis.",
    "product": "Drano Foamer",
    "rating": 5,
    "category": "severe"
  },
  {
    "_id": "590c45fe16840d242de9eced",
    "index": 6,
    "price": "$16.12",
    "about": "Ex cillum elit anim amet nostrud. Anim duis do qui occaecat. Cillum consectetur ex nulla voluptate nostrud sunt incididunt pariatur dolor. Mollit excepteur tempor laboris sit mollit excepteur pariatur in do cupidatat. Ex non ad incididunt eiusmod enim consectetur ea ipsum id et enim. Commodo qui eiusmod cupidatat cillum pariatur laborum Lorem reprehenderit.",
    "product": "Clorox Lestoil",
    "rating": 2,
    "category": "severe"
  },
  {
    "_id": "590c45fea8c4878ecc548c8f",
    "index": 7,
    "price": "$22.04",
    "about": "Occaecat laborum aliqua ea id pariatur voluptate proident aute. Deserunt amet ipsum quis proident quis. Dolore cupidatat eiusmod ullamco voluptate occaecat nulla quis minim ipsum non dolor quis tempor.",
    "product": "Clorox Lestoil",
    "rating": 4,
    "category": "severe"
  },
  {
    "_id": "590c45fee9aa05635b5da873",
    "index": 8,
    "price": "$24.76",
    "about": "Et consectetur ad dolore labore eu amet voluptate veniam ad. Cupidatat eu irure nostrud occaecat sunt anim aliqua sunt mollit. Laborum incididunt sint duis ullamco aliquip deserunt velit cillum dolor irure.",
    "product": "Cif Bathroom Mousse",
    "rating": 1,
    "category": "severe"
  },
  {
    "_id": "590c45fe24d62a3ea0ea5d53",
    "index": 9,
    "price": "$25.55",
    "about": "Duis non mollit Lorem aliquip dolore ad laborum est duis. Cillum voluptate do sint dolore adipisicing aliqua elit deserunt non anim id deserunt cillum. Ut id do deserunt in nisi id et. Consectetur proident esse esse aliquip ad ea est et voluptate exercitation. Et consectetur amet ex ipsum exercitation eu reprehenderit. Incididunt laboris enim tempor et ipsum aute amet reprehenderit. Ea cupidatat labore aliqua aute irure.",
    "product": "Cleret",
    "rating": 3,
    "category": "medium"
  },
  {
    "_id": "590c45fee86905ae9e3c4010",
    "index": 10,
    "price": "$14.68",
    "about": "Pariatur do cupidatat voluptate aliquip sint voluptate esse ea commodo irure do. Est nulla magna anim reprehenderit ipsum eu cupidatat occaecat. Ea enim in labore deserunt officia est eiusmod. Sunt eiusmod mollit eiusmod consequat magna ipsum cillum quis consequat Lorem.",
    "product": "Rin",
    "rating": 4,
    "category": "severe"
  },
  {
    "_id": "590c45fee7ec5fc74c767b60",
    "index": 11,
    "price": "$25.43",
    "about": "Incididunt magna fugiat amet duis aute nostrud ad. Cupidatat laborum sunt sit eiusmod amet esse incididunt reprehenderit anim velit. Veniam culpa sint tempor voluptate dolore. Officia id deserunt dolore veniam id non. Esse qui ipsum consectetur cillum commodo dolore ipsum ipsum dolore esse et ea deserunt exercitation. Deserunt magna tempor ea proident quis nisi aliqua laboris. Excepteur qui duis esse aliqua laborum culpa.",
    "product": "Spring scent",
    "rating": 4,
    "category": "severe"
  },
  {
    "_id": "590c45fee08f0c0701aa2ac4",
    "index": 12,
    "price": "$21.44",
    "about": "Nisi do quis ipsum nostrud cillum sunt. Elit duis sunt est enim sunt ut fugiat elit consectetur tempor do consequat cupidatat. Laborum nisi cupidatat officia ex. Mollit commodo exercitation ad esse aute occaecat labore.",
    "product": "Lysol Disinfectant Wipes",
    "rating": 5,
    "category": "medium"
  },
  {
    "_id": "590c45fe7ef34d6774b5b6ff",
    "index": 13,
    "price": "$14.53",
    "about": "Esse consectetur est tempor sint. Adipisicing dolor laboris cupidatat mollit. Ea tempor dolore Lorem elit voluptate mollit in dolore est. Sint nostrud et ea pariatur anim exercitation. Reprehenderit voluptate dolor duis anim sit. Eu ut quis eiusmod Lorem veniam labore qui. Voluptate et id voluptate laborum.",
    "product": "Lysol Concentrate Disinfectant",
    "rating": 0,
    "category": "medium"
  },
  {
    "_id": "590c45feb16b3117af9db72e",
    "index": 14,
    "price": "$19.01",
    "about": "Veniam anim ut incididunt ex proident. Occaecat non incididunt ad est non commodo irure magna pariatur qui ipsum ea voluptate irure. Et tempor ad magna esse aute non eiusmod enim. Magna consectetur ut ea est Lorem labore et velit.",
    "product": "OxiClean MaxForce Spray",
    "rating": 2,
    "category": "severe"
  },
  {
    "_id": "590c45fe58e87d499b65a676",
    "index": 15,
    "price": "$16.11",
    "about": "Occaecat duis nisi ipsum non pariatur et qui. Eu aliquip deserunt cupidatat irure Lorem sint dolore fugiat officia. Et irure mollit id consectetur.",
    "product": "Glass Cleaner",
    "rating": 0,
    "category": "medium"
  },
  {
    "_id": "590c45fe4106ba48d9c9334f",
    "index": 16,
    "price": "$10.28",
    "about": "In minim esse officia voluptate cupidatat commodo pariatur nostrud esse esse dolor laboris excepteur sunt. Eu sint dolore ullamco aliqua eu aliquip non deserunt minim aute velit ad. Elit officia irure veniam labore. Duis aliqua in excepteur ipsum proident amet sint. Incididunt nostrud aliqua exercitation aute. Aliqua pariatur Lorem ipsum tempor est enim dolor duis nulla elit laborum irure ullamco labore.",
    "product": "Clorox Lestoil",
    "rating": 2,
    "category": "mild"
  },
  {
    "_id": "590c45fe6ff5499f9785eda6",
    "index": 17,
    "price": "$27.63",
    "about": "In ex minim eiusmod anim non proident consectetur est excepteur cupidatat tempor aliqua voluptate reprehenderit. Officia amet ex proident pariatur et. Eiusmod Lorem commodo duis in exercitation exercitation aute irure nostrud. Consectetur dolor reprehenderit adipisicing ullamco et aute veniam culpa labore ex. Ipsum dolore laborum minim nulla qui commodo exercitation et exercitation.",
    "product": "Cif Power Cream",
    "rating": 5,
    "category": "medium"
  },
  {
    "_id": "590c45fea59272d10d7138e0",
    "index": 18,
    "price": "$14.66",
    "about": "Elit Lorem tempor deserunt nulla dolore consectetur duis pariatur voluptate. Anim dolor aute ullamco ea exercitation aliquip sunt eu id eu. Et dolor elit incididunt laborum cupidatat cillum occaecat. Irure sit enim cillum proident aliqua non anim consequat sit.",
    "product": "Goo gone",
    "rating": 4,
    "category": "mild"
  },
  {
    "_id": "590c45fe568db1c296163b46",
    "index": 19,
    "price": "$20.92",
    "about": "Laborum Lorem occaecat enim exercitation eiusmod ut sit nostrud elit dolor eiusmod nulla sint veniam. Id laborum culpa sit ea non reprehenderit incididunt eu. Officia aliquip elit mollit sit laborum nostrud nisi eu quis consequat deserunt. Duis proident duis ex anim culpa minim esse. Lorem culpa consequat aliqua elit nisi nulla laborum aliqua do magna in. Mollit sunt ut sit fugiat nostrud amet non sint aliquip ea. Elit adipisicing occaecat id nulla ex fugiat dolor qui occaecat est.",
    "product": "Clorox Lestoil",
    "rating": 1,
    "category": "medium"
  },
  {
    "_id": "590c45fe9c52dc0c9e23330e",
    "index": 20,
    "price": "$20.73",
    "about": "Cillum duis commodo minim aute consequat cupidatat mollit commodo laboris eu sit consectetur nulla proident. Minim fugiat eu labore labore consectetur in. Consectetur nulla eu duis enim aliquip excepteur incididunt est. Labore non reprehenderit do sunt eiusmod.",
    "product": "OxiClean Power Paks",
    "rating": 0,
    "category": "mild"
  },
  {
    "_id": "590c45fe9abb9ca0a8c10360",
    "index": 21,
    "price": "$24.26",
    "about": "Dolore et ullamco pariatur non mollit enim ad. Consectetur irure aliqua deserunt in et aliqua exercitation voluptate labore enim reprehenderit. Qui labore excepteur voluptate Lorem ullamco Lorem ipsum elit in excepteur nulla. Duis eiusmod ex qui excepteur do sint. Esse velit esse officia do irure ad fugiat aliquip duis labore laboris enim. Consequat est nisi in adipisicing sit aliquip aute aliqua est nisi aute consequat.",
    "product": "Bon Ami Powder cleanser",
    "rating": 3,
    "category": "medium"
  },
  {
    "_id": "590c45fe3eaa59ed431eab05",
    "index": 22,
    "price": "$13.62",
    "about": "Laborum elit elit nulla aliquip mollit nisi incididunt consectetur. Laborum aliqua ut mollit minim do aliquip culpa officia aliqua velit amet. Incididunt nostrud ad ipsum culpa anim duis labore.",
    "product": "Clorox Lestoil",
    "rating": 3,
    "category": "mild"
  },
  {
    "_id": "590c45fe3c2ce99794a3ad44",
    "index": 23,
    "price": "$25.52",
    "about": "In magna ea ad laboris ex dolor id nisi proident sit esse. Duis minim fugiat esse velit culpa eu labore ex pariatur aliqua sint in veniam. Fugiat aute reprehenderit ullamco ullamco nisi id irure. Laboris magna aliquip voluptate excepteur.",
    "product": "Henco",
    "rating": 0,
    "category": "severe"
  },
  {
    "_id": "590c45fe383141eacdd862cb",
    "index": 24,
    "price": "$15.73",
    "about": "Sint ad est irure aliquip non velit eiusmod nisi pariatur nulla in duis irure. Enim esse sunt adipisicing fugiat dolore quis aute esse id ea adipisicing incididunt officia veniam. Minim quis aliquip pariatur culpa elit veniam incididunt fugiat culpa ex officia. Non id ipsum enim nulla pariatur est enim occaecat voluptate dolor dolore consectetur labore eiusmod. Consectetur occaecat aliqua laborum ex incididunt qui labore ut pariatur ad reprehenderit culpa excepteur est.",
    "product": "Rin",
    "rating": 3,
    "category": "medium"
  },
  {
    "_id": "590c45fe6b487aa64fe293d6",
    "index": 25,
    "price": "$11.27",
    "about": "Qui irure ipsum irure est nulla laboris laborum proident reprehenderit. Id esse laborum excepteur mollit id Lorem do. Magna quis tempor amet qui. Nisi aute Lorem occaecat adipisicing minim ea occaecat. Aliquip duis aute et voluptate ad adipisicing aliquip non qui voluptate id nisi. Labore exercitation minim sunt laboris esse qui ullamco sint ad sit nulla aliqua. Ullamco quis labore mollit do culpa elit ipsum sint mollit et.",
    "product": "Cif Power Cream",
    "rating": 5,
    "category": "severe"
  },
  {
    "_id": "590c45fe6f2050c5b817c663",
    "index": 26,
    "price": "$26.52",
    "about": "Ut duis ex deserunt laboris pariatur et commodo laborum ad occaecat pariatur ut. Aliquip aute et nulla id ex consectetur est cupidatat enim incididunt ea deserunt cillum. Consequat anim cupidatat consectetur occaecat adipisicing enim. Id officia velit consequat sunt nostrud nisi ullamco aliqua dolore ullamco velit labore. Exercitation velit veniam veniam ut sint. Voluptate exercitation irure fugiat amet officia nulla exercitation laborum consequat id anim cupidatat ut mollit. Reprehenderit dolore aliquip pariatur ea magna.",
    "product": "Bounty with Dawn",
    "rating": 3,
    "category": "medium"
  },
  {
    "_id": "590c45fe6ce31c8ecc776a5e",
    "index": 27,
    "price": "$26.03",
    "about": "Et aliquip veniam officia culpa dolor. Deserunt qui duis non mollit in enim sunt nostrud fugiat cupidatat exercitation officia amet fugiat. Velit cillum sunt consequat esse id est nulla veniam mollit laborum aliquip sint et sint. Pariatur commodo cillum minim dolor ex velit anim ipsum voluptate culpa dolor reprehenderit eiusmod. Ex ullamco excepteur veniam cupidatat aliqua qui anim. Velit qui Lorem sint et do ut aliqua. Dolore pariatur minim consequat ut consectetur anim veniam ut velit dolor qui.",
    "product": "Henco",
    "rating": 2,
    "category": "severe"
  },
  {
    "_id": "590c45fe5969959ddd90870e",
    "index": 28,
    "price": "$22.60",
    "about": "Irure magna laborum deserunt non do anim velit eiusmod. Ex dolor nostrud minim irure ut tempor adipisicing tempor minim pariatur. Et sunt irure elit ad aute excepteur do nisi occaecat adipisicing.",
    "product": "Fresh lemon breeze",
    "rating": 5,
    "category": "medium"
  },
  {
    "_id": "590c45fefd18603f603736bf",
    "index": 29,
    "price": "$21.87",
    "about": "Commodo ea duis ea anim. In esse aliqua cupidatat voluptate ullamco deserunt consectetur culpa occaecat deserunt incididunt. Nulla quis est dolor est irure nisi fugiat cupidatat qui quis. Do fugiat ad ut aute anim incididunt ex exercitation. Dolor fugiat adipisicing esse officia amet amet eiusmod exercitation officia eu aliquip elit.",
    "product": "Lysol Disinfectant Wipes",
    "rating": 3,
    "category": "severe"
  },
  {
    "_id": "590c45fe6e6f5271fe7ce719",
    "index": 30,
    "price": "$27.17",
    "about": "Enim tempor dolore ea occaecat fugiat minim quis magna nisi ipsum esse ipsum commodo. Reprehenderit non minim nulla quis eiusmod aliquip duis non in nisi dolor deserunt. Anim pariatur sint tempor minim nostrud aliquip duis sit in cupidatat dolor. Incididunt ex est ullamco et nulla quis ad eu voluptate. Irure et deserunt reprehenderit aliquip cupidatat Lorem deserunt ullamco pariatur aliqua adipisicing pariatur sint. Magna sit ex laboris ex laboris.",
    "product": "Clorox Lestoil",
    "rating": 4,
    "category": "medium"
  },
  {
    "_id": "590c45fe9144a1be1187ddb2",
    "index": 31,
    "price": "$13.57",
    "about": "Voluptate dolor labore proident officia dolor ad velit occaecat deserunt incididunt. Non minim do aute proident nisi nulla et ut laborum laborum proident ut. Mollit velit dolore sint do ipsum ex enim id nisi aute commodo amet laboris. Ex anim qui reprehenderit cillum tempor ea anim eu dolor est in incididunt sunt nulla. Dolore laboris esse excepteur id velit elit.",
    "product": "Glass Cleaner",
    "rating": 5,
    "category": "severe"
  },
  {
    "_id": "590c45fe22e24749fd0785f7",
    "index": 32,
    "price": "$18.66",
    "about": "Sint velit adipisicing ut laboris. Reprehenderit deserunt ea elit labore nostrud consectetur anim ipsum amet irure quis eu magna enim. Ex reprehenderit velit culpa nulla consectetur ea do consectetur aliqua. Duis laboris labore eu velit quis et excepteur eiusmod.",
    "product": "Cleret",
    "rating": 4,
    "category": "medium"
  }
];