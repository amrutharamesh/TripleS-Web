var socket = io.connect();
socket.on('suggestion', function(data){
	$('#main-suggest').children().remove();
	for(var i=0; i<data.values.length;i++){
		var d2 = $("<div>", {"class": "col-lg-3 col-md-3 col-xs-6 product-box"});
		var d3 = $("<div>", {"class": "col-lg-8 col-md-8 col-xs-8"});
		var d4 = $("<div>", {"class": "name"});
		var d5 = $("<div>", {"class": "info"});
		var d6 = $("<div>", {"class": "options"});
		var d7 = $("<i>", {"class": "fa fa-shopping-cart"});
		var d8 = $("<span>", {"class": "cart", "text" : "Add to cart"});
		var d9 = $("<i>", {"class": "fa fa-info"});
		var d10 = $("<span>", {"class": "look", "text" : "Look inside"});
		var d11 = $("<div>", {"class": "col-lg-4 col-md-4 col-xs-4 prod-wrap"});
		var d12 = $("<div>", {"class": "product"});
		var d13 = $("<span>", {"class": "word", "text" : "P"});

		$(d4).text(data.values[i].product);
		$(d5).text(data.values[i].price);
		$(d6).append(d7);
		$(d6).append(d8);
		$(d6).append(d9);
		$(d6).append(d10);
		$(d3).append(d4);
		$(d3).append(d5);
		$(d3).append(d6);
		$(d2).append(d3);
		$(d12).append(d13);
		$(d11).append(d12);
		$(d2).append(d11);
		$('#main-suggest').append(d2);
	}
});