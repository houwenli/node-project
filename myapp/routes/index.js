var express = require('express');
var router = express.Router();
var web = require('../web/index');
var server = require('../server/index');

router.use('/web', web);
router.use('/server', server)



module.exports = router;
