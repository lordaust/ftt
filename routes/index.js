var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'For The Title - The way online footballl manager is meant to be' });
});


router.get('/healthcheck', function(req, res){
  var responseObject = { message: 'OK' };
  res.send(responseObject);
});

router.get('/idontlike/:icecreamchoice/:name', function(req, res) {
    var choice = req.params.icecreamchoice;
    var name = req.params.name;
    var responseObject = { message: 'Hey ' +name +'! I dont like'  + choice + ' too!'};
    res.send(responseObject);
});

var database = [];

router.post('/ilike/:icecreamchoice/:name', function(req, res) {
    if(req.body.formfactor) {
        console.log(req.body.formfactor);
    }else{
        console.log('No form factor!');
    }
    var choice = req.params.icecreamchoice;
    var name = req.params.name;
    if(name == 'alex') {
        database.push({choice: choice, name: name});

        var responseObject = {message: 'Hey ' + name + '! I like ' + choice + ' too!'};
        res.send(responseObject);
    } else {
        res.status(400).send();
    }
});

router.get('/likes', function(req, res) {
    var logvalue= req.headers['log'];
    if(logvalue && logvalue == 'info') {
        console.log("Request recieved for /likes.");
    }

    var select = req.query.select;
    if(database.length == 0) {
        var responseObject = undefined;
        if(select && select == 'count'){
            responseObject = {count: 0};
        }
        res.status(404).send(responseObject);

    } else {
        var responseObject = database;
        if(select && select == 'count'){
            responseObject = {count: database.length};
        }
        res.send(responseObject);
    }
});


module.exports = router;
