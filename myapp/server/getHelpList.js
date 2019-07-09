var express = require('express');
var router = express.Router();

router.use('/', function (req, res, next) {
    var age = 15;
    res.json({'name': 'houwenli', age});
})

module.exports = router;