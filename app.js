var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var players = require('./routes/players');
var player = require('./routes/player');
var users = require('./routes/users');
var serverstat = require('./routes/serverstatus');

var app = express();

// view sqlserver
//var dbConfig = {
//  server: "localhost\\MSSQLSERVER",
//  database: "distribution_database",
//  user: "sa",
//  password: "u6Axjd3v",
//  port: 1433
//};

//function getEmp(){
//  var conn = new sql.Connection(dbConfig);

//  conn.connect().then(function(){
//    var req = new sql.Request(conn);
//    req.query("SELECT * FROM dbo.firstname").then(function(recordset){
//      console.log(recordset);
//      conn.close();
//    })
//    .catch(function (err){
//      console.log(err);
//      conn.close();
//    });
//  })
//  .catch(function (err) {
//    console.log(err);
//  });

//  var req = new sql.Request(conn);
//
//  conn.connect(function(err){
//   if(err){
//      console.log(err);
//      return;
//    }
//      req.query("SELECT * FROM dbo.firstname", function(err, recordset){
//        if(err){
//          console.log(err);
//          return;
//        } else {
//          console.log(recordset);
//        }
//        conn.close();
//      });
//  });
//}

//getEmp();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/players', players);
app.use('/player', player);
app.use('/serverstatus', serverstat);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
