var socket = io.connect();
socket.on('notify', function(data){
	$('#main-notify').children().remove();
	for(var i=0; i<data.gasInfo.length;i++){
		var type = '';
		if(data.gasInfo[i].value < 185) type = 'quite mild';
		if(data.gasInfo[i].value > 185 && data.gasInfo[i].value < 250) type = 'quite stale';
		if(data.gasInfo[i].value > 250 && data.gasInfo[i].value < 500) type = 'real bad';
		if(data.gasInfo[i].value > 500) type = 'really terrible';
		var $div = $("<div>", {"class": "col-lg-6 col-md-6 col-xs-6 notification-val"});
		$($div).text("Odor detected "+type+" with value "+data.gasInfo[i].value);
		var $div2 = $("<div>", {"class": "col-lg-6 col-md-6 col-xs-6 notification-ts"});
		$($div2).text("Time : "+new Date(data.gasInfo[i].ts));
		var $div1 = $("<div>", {"class": "col-lg-12 col-md-12 col-xs-12 notification"});
		$($div1).append($div);
		$($div1).append($div2);
		$('#main-notify').prepend($div1);
	}
});