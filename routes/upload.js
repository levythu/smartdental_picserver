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
    db[PIC_DB].find({caseid: req.query.caseid},function(err, docs)
    {
        if (err || docs.length>0)
        {
            res.send("Existing picture.");
            return;
        }
        next();
    });
});

router.post('/', function(req, res)
{
    var thefile=req.files.upfile;
    if (thefile==null)
    {
        res.redirect("/upload?caseid="+req.query.caseid);
        return;
    }

    if (thefile instanceof Array)
        thefile=thefile[0];
    db[PIC_DB].insert(
    {
        caseid: req.query.caseid,
        picurl: thefile.path.substr(6),
        notate: [],
        pic_name: req.body.name,
        position: req.body.area,
        belongs:  req.body.uid,
        date:     (new Date()).getTime(),
        delete:   0,
        record:   0,
        read:     0,
        hide:     0
    },function()
    {
        res.redirect("/edit?caseid="+req.query.caseid);
        return;
    });
});

router.get('/', function(req, res)
{
    res.render("upload",{caseid: req.query.caseid});
});

module.exports = router;
