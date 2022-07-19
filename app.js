var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');
var expressValidator = require('express-validator');
var cors = require('cors');


var indexRouter = require('./routes/index');
var commonRouter = require('./routes/common');
var useScreenRoute = require('./routes/useScreenRoute');
var usersRoute = require('./routes/usersRoute');
var adminRouter = require('./routes/admin');

var app = express();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(`mongodb://127.0.0.1:27017/fitscope`, { useNewUrlParser: true }, (err, result) => {
  if (err) {
    console.log("Error in connecting with database")
  }
  else {
    console.log('Mongoose connecting is setup successfully')
  }
});

// view engine setup

app.all("*", (req, resp, next) => {


  let obj = {
    Host: req.headers.host,
    ContentType: req.headers['content-type'],
    Url: req.originalUrl,
    Method: req.method,
    Query: req.query,
    Body: req.body,
    Parmas: req.params[0]
  }
  console.log("Common Request is===========>", [obj])
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(cors());
app.use('/', indexRouter);

app.use('/api/v1/common', commonRouter);
app.use('/api/v1/usescreen', useScreenRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/admin', adminRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
