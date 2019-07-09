var express = require('express');
var router = express.Router();

var getUserInfo = require('./getUserInfo');
var getHelpList = require('./getHelpList');
var login = require('./login');
var regist = require('./regist');
var uploadImg = require('./uploadImg');
var addImgType = require('./addImgType');
var getTypes = require('./getTypes');
var photoList = require('./photoList');

router.use('/getUserInfo', getUserInfo);

router.use('/getHelpList', getHelpList);

router.use('/login', login);

router.use('/regist', regist);

router.use('/uploadImg', uploadImg);

router.use('/addImgType', addImgType);

router.use('/getTypes', getTypes);

router.use('/photoList', photoList);

module.exports = router;