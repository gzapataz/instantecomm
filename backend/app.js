var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var personsRouter = require('./routes/person');
var clientsRouter = require('./routes/client');
var professionalsRouter = require('./routes/professional');
var ratingsRouter = require('./routes/rating');
var clinicsRouter = require('./routes/clinic');
var servicesRouter = require('./routes/service');
var serviceConditionsRouter = require('./routes/serviceCondition');
var appointmentsRouter = require('./routes/appointment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/persons', personsRouter);
app.use("/clients", clientsRouter);
app.use("/professionals", professionalsRouter);
app.use("/ratings", ratingsRouter);
app.use("/clinics", clinicsRouter);
app.use("/services", servicesRouter);
app.use("/serviceConditions", serviceConditionsRouter);
app.use("/appointments", appointmentsRouter);

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