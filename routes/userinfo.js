var express = require('express');
var model = require('../models/models');

var router = express.Router();
var db=model.db;
var PIC_DB=model.picrcd;
var USER_DB=model.user;

router.get('/', function(req, res) {
    if (req.query.user==null)
    {
        res.send("[]");
        return;
    }
    db[PIC_DB].find(
    {
        belongs:  req.query.user+"",
        delete:   0
    },function(err,docs)
    {
        if (err || docs.length==0)
        {
            res.send("[]");
            return;
        }
        var ret=[];
        var obj;
        for (var i=0;i<docs.length;i++)
        {
            obj={};
            if (docs[i].pic_name==null)
                obj.pic_name="暂无名字";
            else
                obj.pic_name=docs[i].pic_name;

            if (docs[i].position==null)
                obj.position="暂无部位";
            else
                obj.position=docs[i].position;

            if (docs[i].date==null)
                obj.date="暂无时间";
            else
            {
                var dat=new Date(docs[i].date)
                obj.date=dat.getFullYear()+"-"+(dat.getMonth()+1)+"-"+dat.getDate();
            }

            if (docs[i].read==null)
                obj.read=0;
            else
                obj.read=docs[i].read;

            if (docs[i].hide==null)
                obj.hide=0;
            else
                obj.hide=docs[i].hide;

            if (docs[i].record==null)
                obj.record=0;
            else
                obj.record=docs[i].record;

            obj.caseid=docs[i].caseid;
            ret.push(obj);
        }
        var ret2={};
        ret2._id=req.query.user+"";
        ret2.pic_info=ret;

        res.send(JSON.stringify(ret2));
    });
});
router.post('/',function(req,res)
{
    if (req.body.caseid==null)
    {
        res.send("fail");
        return;
    }
    for (var i in req.body)
    {
        if (i!="caseid" && (req.body[i]=="0" || req.body[i]=="1"))
            req.body[i]-=0;
    }
    db[PIC_DB].update(
    {
        caseid:req.body.caseid
    },
    {
        $set:req.body
    },{multi:false},function(err,docs)
    {
        if (err)
        {
            res.send("fail");
            return;
        }
        res.send("success");
    });
});

module.exports = router;
