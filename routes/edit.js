var express = require('express');
var model = require('../models/models');

var router = express.Router();
var db = model.db;
var PIC_DB = model.picrcd;

router.use(function(req, res, next)
{
    if (req.query.caseid==null)
    {
        res.send("Invalid caseid.");
        return;
    }
    db[PIC_DB].find({caseid: req.query.caseid},function(err, docs)
    {
        if (err || docs.length==0)
        {
            res.redirect("/upload?caseid="+req.query.caseid);
            return;
        }
        next();
    });
});
router.use(function(req, res, next)
{
    if (req.is('text/*'))
    {
        req.rawData = '';
        req.setEncoding('utf8');
        req.on('data', function(chunk){ req.rawData += chunk });
        req.on('end', next);
    }
    else
    {
        for (i in req.body)
        {
            req.rawData=i;
        }
        next();
    }
});

router.post('/', function(req, res)
{
    var toi = JSON.parse(req.rawData);
    db[PIC_DB].update({caseid: req.query.caseid},
    {
        $set: {notate: toi}
    },function()
    {
        res.send("success");
    });
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
        res.render("doctor",
        {
            picurl: docs[0].picurl,
            notate: JSON.stringify(docs[0].notate).replace(/'/g,'"')
        });
    });
});

module.exports = router;
