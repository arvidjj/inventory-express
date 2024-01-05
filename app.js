var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require("passport");
const local = require("./strategies/local");

var logger = require('morgan');
// Import the mongoose module
const mongoose = require("mongoose");

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = "mongodb+srv://andyoj14:Oynkmi5x8bS0ZS9F@cluster0.h4v8u5q.mongodb.net/InventoryApp?retryWrites=true&w=majority";

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const itemRoutes = require('./routes/items');
const categoryRoutes = require('./routes/categories');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemRoutes);
app.use('/categories', categoryRoutes);

app.use(session({
  secret: "cats", cookie: {maxAge:30000}, resave: false, saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
