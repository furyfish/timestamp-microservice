const express = require('express');
const moment = require('moment');

const app = express();

var isStringDate = function(date) {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

var isEpochDate = function(date) {
  return (new Date(parseInt(date)) !== "Invalid Date") && !isNaN(new Date(parseInt(date)));
}

app.get('/', (req, res) => {
  res.send('Hello world!')
});

app.get('/api/timestamp/:time', (req, res) => {
  let time = req.params.time;
  if (isStringDate(time)) {
    res.send({"unix":parseInt(time), "utc":moment().format('ddd, D MMM')});
  } else if (isEpochDate(time)) {
    res.send({"unix":parseInt(time), "utc":moment().format('ddd, D MMM')});
  } else {
    res.send({"error":"Invalid Date"});
  }
});

app.listen(3000, () => {
  console.log('server started');
});