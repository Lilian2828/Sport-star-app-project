exports.index = function(req, res) {
	var message = '';
	res.render('index', {message: message})
};


exports.home = function(req, res){
	var message = '';
	res.render('home', {message: message})
};