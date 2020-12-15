var express = require('express');
var router = express.Router();

var users = require('./users');
var getTypesImg = require('./getTypesImg');
var getImgList = require('./getImgList');

router.use('/users', users)
router.use('/getTypesImg', getTypesImg)
router.use('/getImgList', getImgList)

module.exports = router;