var express = require('express');
var multer = require('multer');
var model = require('../models/models');

var router = express.Router();
var db = model.db;
var PIC_DB = model.picrcd;

router.use(multer({ dest: './public/pics/'}));

router.use(function(req, res, next)
{
    if (req.query.caseid==null)
    {
        res.send("Invalid caseid.");
        return;
    }
    next();
});

router.get('/', function(req, res)
{
    db[PIC_DB].find({caseid: req.query.caseid},function(err, docs)
    {
        if (err || docs.length==0)
        {
            res.send("Invalid caseid.");
            return;
        }
        res.send(JSON.stringify(docs[0]));
    });
});

module.exports = router;
