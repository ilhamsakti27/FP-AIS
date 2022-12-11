var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var authJwt = require("./auth/authJwt")
var indexRouter = require('./routes/index');
const cookieSession = require("cookie-session");
const cors = require('cors')
// app.use(cors({credentials: true}));

const page = require('./routes/page')
const testing = require('./routes/testing')
const userController = require('./controllers/users')
var app = express();
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

app.use(
  cookieSession({
    name: "kai-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// RENDER PAGE
app.get('/',indexRouter);
app.get('/booking', page.booking);
app.get('/register', page.register);
app.get('/login', page.login);
app.get('/passenger',page.passenger);
app.get('/checkout', page.checkout);

// API-ENDPOINT
app.post('/api/register',userController.signup)
app.post('/api/login',userController.login)
app.get('/api/logout',userController.logout)
app.post('/api/booking',userController.booking)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
