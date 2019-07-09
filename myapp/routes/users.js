var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users/houwenli listing. */
router.get('/houwenli', function(req, res, next) {
  res.send('this is houwenli page');
});

module.exports = router;
