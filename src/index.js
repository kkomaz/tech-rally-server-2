require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

// mongodb setup
const mongoose = require('mongoose');

const mongoDB = process.env.DATABASE;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// Next configs
const dev = process.env.NODE_ENV !== 'production';

// Routes
const routes = require('./routes');

const app = express();
app.use(bodyParser.json())

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

routes(app);

const PORT = process.env.PORT || 5000;

app.listen((PORT), () => {
  console.log('listening on port ' + PORT);
});