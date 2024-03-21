const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Cors untuk api bisa diakses oleh frontend
const cors = require('cors')

// Method override untuk method PUT dan DELETE pada file ejs
const methodOverride = require('method-override')

// Untuk Session
// const session = require('express-session')
const session = require('cookie-session')

// Connect Flash
const flash = require('connect-flash');

// Router Admin
const dashboardRouter = require('./app/dashboard/router');
const categoryRouter = require('./app/category/router');
const nominalRouter = require('./app/nominal/router');
const voucherRouter = require('./app/voucher/router');
const bankRouter = require('./app/bank/router');
const paymentRouter = require('./app/payment/router');
const usersRouter = require('./app/users/router');
const transactionRouter = require('./app/transaction/router');
const playerRouter = require('./app/player/router');

// Untuk API
const authRouter = require('./app/auth/router');

const app = express();

// URL
const URL = '/API/v1'

// Cors
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Method override
app.use(methodOverride('_method'))

// Express Session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

// Connect Flash
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup AdminLTE
app.use('/adminlte', express.static(path.join(__dirname, '/node_modules/admin-lte')))

app.use('/', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/category', categoryRouter);
app.use('/nominal', nominalRouter);
app.use('/voucher', voucherRouter);
app.use('/bank', bankRouter);
app.use('/payment', paymentRouter);
app.use('/transaction', transactionRouter);

// API
app.use(`${URL}/players`, playerRouter);
app.use(`${URL}/auth`, authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
