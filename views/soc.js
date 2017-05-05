var socket = io.connect();
socket.on('date', function(data){
	$('#date').text(data.date);
});
$(document).ready(function(){
	$('#text').keypress(function(e){
  	socket.emit('client_data', {'letter': String.fromCharCode(e.charCode)});
	});
});