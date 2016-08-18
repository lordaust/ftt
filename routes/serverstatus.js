/**
 * Created by alex on 03.08.2016.
 */
var express = require('express');
var router = express.Router();

router.get('/errorcount', function(req, res){
   res.send({errorCount:0});
});

module.exports = router;