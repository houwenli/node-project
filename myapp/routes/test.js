var express = require('express');
var router = express.Router();
var path = require('path');
var util = require('util');

/* GET users/houwenli listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/test.html'));
});

/* 中间件 */
var requestTime = function(req, res, next) {
  req.requestTime = Date.now();
  next();
}

router.use('/middleware', requestTime)
router.get('/middleware', function(req, res, next) {
  var responseText = 'Hello World!';
  responseText += 'Requested at: ' + req.requestTime + '';
  res.send(responseText);
});

/* log */
router.get('/log', function(req, res, next) {
  var responseText = 'Hello log!';
  responseText += 'Requested at: ' + req.requestTime + '';
  res.send(responseText);
});

/****应用层中间件****/
router.use('/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

router.get('/:id', function(req, res, next) {
  var responseText = 'Hello 应用层中间件!';
  responseText += 'Requested id:  ' + req.params.id;
  res.send(responseText);
});

module.exports = router;
