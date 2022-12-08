var express = require('express');
var router = express.Router();
const auth = require('../auth/authJwt')

/* GET home page. */
router.get('/', auth.indexPage);

module.exports = router;
