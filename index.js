const express = require('express');
const moment = require('moment-timezone');

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

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get('/api/timestamp/:time', (req, res) => {
  let time = req.params.time;
  console.log(time);
  if (isStringDate(time)) {
    res.send({unix:moment(new Date(time)).valueOf(), utc:moment(new Date(time)).format('ddd, D MMM YYYY HH:MM:SS') + ' ' + moment.tz(new Date(time), 'Europe/London').format('z')});
  } else if (isEpochDate(time)) {
    res.send({unix:time, utc:moment(new Date(parseInt(time))).format('ddd, D MMM YYYY HH:MM:SS') + ' ' + moment.tz(new Date(parseInt(time)), 'Europe/London').format('z')});
  } else {
    res.send({error:"Invalid Date"});
  }
});

app.listen(3000, () => {
  console.log('server started');
});