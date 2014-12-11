document.onkeydown = keyDown
var mydata = new Array();
var myimage = new Image();
var myobject = new Object();
var count = 0;
var flag = 0;
var choice= 0;
var myzoom = 10;
var mousein = 0;
var post = 1;
var firstdata = new Array();
myimage.onload = function()
{
    $('#myimg').attr("src",myimage.src)
    $('#myimg').height(myimage.height*myzoom/10)
    $('#myimg').width(myimage.width*myzoom/10)
    $('#Imgdiv').height(myimage.height*myzoom/10)
    $('#Imgdiv').width(myimage.width*myzoom/10)
    $('#Imgdiv').attr("onmousedown","Mymousedown(event)");
    $('#Imgdiv').attr("onmouseup","Mymouseup(event)");
    $('body').attr("onresize","Myresize()");
    $('#publishBtn3').attr("onclick","deleteall()");
    $('#publishBtn2').attr("onclick","deletechoice()");
    $('#publishBtn1').attr("onclick","submitdata()");
    $('#Imgdiv').attr("onmouseover","setmousein(1)");
    $('#Imgdiv').attr("onmouseout","mymouseout(event)");
    setstyle1();
    for(i=0;i<firstdata.length;i++)
    {
        myobject = new Object();
        myobject.x1 = firstdata[i].x1;
        myobject.x2 = firstdata[i].x2;
        myobject.y1 = firstdata[i].y1;
        myobject.y2 = firstdata[i].y2;
        myobject.flag=1;
        mydata[i] = myobject;
        createRect();
        count++;
        $('#text'+i).val(firstdata[i].data);
    }
    document.onkeydown = keyDown;
}

function Mymousedown(event)
{
    myobject = new Object();
    myobject.x1=(event.clientX-$('#Imgdiv').offset().left)*10/myzoom;
    myobject.y1=(event.clientY-$('#Imgdiv').offset().top)*10/myzoom;
    event.preventDefault();
    flag = 1;
}

function Mymouseup(event)
{
    x2=(event.clientX-$('#Imgdiv').offset().left)*10/myzoom;
    y2=(event.clientY-$('#Imgdiv').offset().top)*10/myzoom;
    event.preventDefault();
    if(flag==1&&post==1)
    {
        if(myobject.x1>x2)
        {
            myobject.x2 = myobject.x1;
            myobject.x1= x2;
        }
        else myobject.x2 = x2;
        if(myobject.y1>y2)
        {
            myobject.y2 = myobject.y1;
            myobject.y1= y2;
        }
        else myobject.y2 = y2;
        for(var i=0;i<mydata.length;i++)
        {
            if(checkpoint(myobject,mydata[i]))
            {
                showchoice(i);
                flag=0;
                event.preventDefault();
                choice = i;
                return;
            }

        }
        if((myobject.y2-myobject.y1)>9&&(myobject.x2-myobject.x1)>9)
        {
            createRect();
            count++;
        }
    }
    flag=0;
    event.preventDefault();
}

function createRect()
{
    myobject.flag=1;
    mydata[count] =  myobject
    $('#Imgdiv').append("<div id='rect"+count+"' class='myrect'></div>");
    $('#mycontent').append("<textarea id='text"+count+"' class='mytext form-control' placeholder='请输入标注信息'></textarea> ");
    drawrect(count)
    showchoice(count);
    choice=count;
}

function drawrect(num)
{
    $('#rect'+num).css("top",mydata[num].y1*myzoom/10);
    $('#rect'+num).css("left",mydata[num].x1*myzoom/10);
    $('#rect'+num).css("height",(mydata[num].y2-mydata[num].y1)*myzoom/10);
    $('#rect'+num).css("width",(mydata[num].x2-mydata[num].x1)*myzoom/10);
    $('#rect'+num).attr("onmouseenter","setmousein(1)");
}

function  showchoice(num)
{
    if(mydata[num]!=undefined&&mydata[num].flag==1)
    {
        setstyle2();
        $('.myrect').attr("class","myrect myrect1");
        $('#rect'+num).attr("class","myrect myrect2");
        $('.mytext').hide();
        $('#text'+num).show();
    }
}

function checkpoint(o1,o2)
{
    return (o2.flag==1&&o1.x1>=o2.x1&&o1.y1>=o2.y1&&o1.x2<=o2.x2&&o1.y2<=o2.y2)
}

function deletechoice()
{
    if(mydata[choice]!=undefined&&post==1)
    {
        setstyle1();
        $('#rect'+choice).hide();
        $('#text'+choice).hide();
        mydata[choice].flag=0;
        for (var i=0;i<mydata.length;i++)
        {
            if(mydata[i].flag==1)
            {
                choice = i;
                showchoice(i);
                break;
            }
        }
    }
}

function deleteall()
{
    if(post==1)
    {
        setstyle1();
        $('.myrect').remove();
        $('.mytext').remove();
        mydata = new Array();
        count=0;
    }
}

function setstyle1()
{
    $('#left').height(($(document).height()-$("header").height())*0.8)
    $('#left').width($(document).width()*0.50)
    $('#left').css("top",($(document).height()-$("header").height())*0.1);
    $('#left').css("left",($(document).width()-$('#left').width())/2);
    setpicture();
    $('#right').hide();
}
$.ready(function()
{
    $('#left').height(($(document).height()-$("header").height())*0.8)
    $('#left').width($(document).width()*0.50)
    $('#left').css("top",($(document).height()-$("header").height())*0.1);
    $('#left').css("left",($(document).width()-$('#left').width())/2);
    $('#right').hide();
});
function setstyle2()
{
    $('#left').height(($(document).height()-$("header").height())*0.8)
    $('#left').width($(document).width()*0.50)
    $('#left').css("top",($(document).height()-$("header").height())*0.1);
    $('#left').css("left",($(document).width()*0.07));
    $('#right').show();
    $('#right').height(($(document).height()-$("header").height())*0.8)
    $('#right').width($(document).width()*0.35)
    $('#right').css("top",($(document).height()-$("header").height())*0.1);
    $('#right').css("left",($(document).width()*0.58));
    $('.mytext').height($('#right').height()*0.7);
    $('.mytext').width($('#right').width()*0.95);
    $('#mycontent').height($('#right').height()*0.7);
    $('#mycontent').width($('#right').width());
    $('.btn').css("top",$('#right').height()*0.7+20);
    $('.tip').css("top",$('#right').height()*0.7+60);
    $('.tip').hide();
    setpicture();
}

function setpicture()
{
    if($('#Imgdiv').width()<$('#left').width())
    {
        $('#Imgdiv').css("left",($('#left').width()-$('#Imgdiv').width())/2);
    }
    else $('#Imgdiv').css("left",0);
}

function Myresize()
{
    if(mydata[choice]!=undefined&&mydata[choice].flag==1)
    {
        setstyle2();
    }
    else setstyle1();
}

function setmousein(num)
{
    mousein=num;
}

function mymouseout(event)
{
    var s = event.toElement || event.relatedTarget;
    if (!$('#Imgdiv')[0].contains(s)) {setmousein(0);}
}


function keyDown(event)
{
    if(mousein==1)
    {
        if(event.which==187 || event.which==61)
        {
            myzoom++;
            Myredraw();
        }
        else if(event.which==189 || event.which==173)
        {
            myzoom--;
            Myredraw();
        }
    }
}

function Myredraw()
{
    if(myzoom < 2) myzoom=2;
    if(myzoom >50) myzoom=50;
    $('#myimg').height(myimage.height*myzoom/10);
    $('#myimg').width(myimage.width*myzoom/10);
    $('#Imgdiv').height(myimage.height*myzoom/10);
    $('#Imgdiv').width(myimage.width*myzoom/10);
    for (var i=0;i<mydata.length;i++)
    {
        drawrect(i)
    }
    setpicture();
}

function readyStateChanged()
{
    if (xmlhttp.readyState==4)
    {// 4 = "loaded"
        if (xmlhttp.status==200)
        {// 200 = OK
            $('#success').show();
        }
        else
        {
            $('#fail').show();
        }
        post=1;
        $('.mytext').removeAttr("readonly");
	}

}


function submitdata()
{
    if(post==1)
    {
        var senddata = new Array();
        var sendobject = new Object();
        var j=0;
        for (var i=0;i<mydata.length;i++)
        {
            if(mydata[i].flag==1)
            {
                sendobject = new Object();
                sendobject.x1 = mydata[i].x1;
                sendobject.x2 = mydata[i].x2;
                sendobject.y1 = mydata[i].y1;
                sendobject.y2 = mydata[i].y2;
                sendobject.data = $('#text'+i).val();
                senddata[j] = sendobject;
                j++;
            }
        }
        post=0;
        $('.mytext').attr("readonly","true");
        console.log(JSON.stringify(senddata));
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('post',window.location.href,true);
        xmlhttp.onreadystatechange = readyStateChanged;
        xmlhttp.send(JSON.stringify(senddata));
    }
}
