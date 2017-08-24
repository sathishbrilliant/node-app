const routes = require('express').Router();
var mysqlserver = require("mysql");
var userService=require("../services/UserService");
var storageService=require("../services/StorageService");
var user = {};

/** routing for all the url path ***/
routes.get('/', function(req, res) {
	res.render(
	        'index',
	        { title: 'Hey Hey Hey!', message: 'Yo Yo'})
	});

routes.post('/login', function(req, res) {
	user = {
		username : req.body.name,
		password : req.body.password
	}
	console.log("submitted form"+JSON.stringify(req.body));
	console.log("control coming to login method"+JSON.stringify(user));
	userService.insertUser(user);
	userService.fetchUser(user);
	storageService.set('userDetails',user);
	
	res.render('welcome', {
		message : user.username
	});
});

routes.get('/about', function(req, res) {
	var storagevalues=storageService.get('userDetails');
	console.log("storage values"+JSON.stringify(storagevalues));
	res.render('about',{dto:storagevalues});
});


module.exports = routes;