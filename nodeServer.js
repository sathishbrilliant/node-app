var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysqlserver = require("mysql");
var userService=require("./webContent/app/services/UserService");
var storageService=require("./webContent/app/services/StorageService");



//view engine setup
app.set('views', path.join(__dirname, './webContent/app/views/'));
app.set('view engine', 'pug');


/*to get request values from html page*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

/*app.use(express.static(__dirname + '../views/'));*/


app.get('/', function(req, res) {
	res.render(
	        'index',
	        { title: 'Hey Hey Hey!', message: 'Yo Yo'})
	});


var user = {};
app.post('/login', function(req, res) {
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


app.get('/about', function(req, res) {
	console.log("control coming here");
	var storagevalues=storageService.get('userDetails');
	console.log("storage values"+JSON.stringify(storagevalues));
	res.render('about',{dto:storagevalues});
});

var portNumber=8080
app.listen(portNumber, function() {
	console.log("listening on port number :::::"+portNumber);
});

/*, enctype='application/x-www-form-urlencoded'*/
