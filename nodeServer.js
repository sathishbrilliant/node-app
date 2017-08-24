var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const router=require('./webContent/app/Router/urlRouter');



/***pug view engine set up***/
app.set('views', path.join(__dirname, './webContent/app/views/'));
app.set('view engine', 'pug');


/***to convert all the request into json ***/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));


/***router occurs here refer folder Router and read a file urlRouter.js ***/
app.use('/',router);


/***creating http server***/
var portNumber=8080
app.listen(portNumber, function() {
	console.log("listening on port number :::::"+portNumber);
});



/***, enctype='application/x-www-form-urlencoded'***/


