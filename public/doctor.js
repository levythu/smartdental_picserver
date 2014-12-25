document.onkeydown = keyDown
var mydata = new Array();
var myimage = new Image();
var myobject = new Object();
var count = 0;
var choice= -1;
var myzoom = 10;
var mousein = 0;
var post = 1;
var firstdata = new Array();
var canvas;
var context;
var drawflag=0;

myimage.onload = function()
{
    $('#myimg').attr("src",myimage.src)
    $('#Imgdiv').attr("onmousedown","Mymousedown(event)");
    $("body").attr("onmouseup","Mymouseup2(event)");
    $('#Imgdiv').attr("onmouseup","Mymouseup(event)");
    $('body').attr("onresize","Myresize()");
    $('#publishBtn3').attr("onclick","deleteall()");
    $('#publishBtn2').attr("onclick","deletechoice()");
    $('#publishBtn1').attr("onclick","submitdata()");
    $('#Imgdiv').attr("onmouseover","setmousein(1)");
    $('#Imgdiv').attr("onmouseout","setmousein(0)");
    setstyle1();
    for(var i=0;i<firstdata.length;i++)
    {
        myobject = new Object();
        myobject.point = firstdata[i].point;
        calstar();
        createMark();
        $('#text'+i).val(firstdata[i].data);
    }
    Myreset();
    document.onkeydown = keyDown;
}

$.ready(function()
{
    $('#left').height(($(document).height()-$("header").height())*0.8)
    $('#left').width($(document).width()*0.50)
    $('#left').css("top",($(document).height()-$("header").height())*0.1);
    $('#left').css("left",($(document).width()-$('#left').width())/2);
    $('#right').hide();
});

function calstar()
{   
    myobject.x=0;
    myobject.y=0;
    for(var j=0;j<myobject.point.length;j++)
    {
        myobject.x+=myobject.point[j].x;
        myobject.y+=myobject.point[j].y;
    }
    myobject.x = myobject.x/myobject.point.length;
    myobject.y = myobject.y/myobject.point.length;
}

function Myreset()
{
    if(myzoom < 2) myzoom=2;
    if(myzoom >50) myzoom=50;
    $('#myimg').height(myimage.height*myzoom/10);
    $('#myimg').width(myimage.width*myzoom/10);
    $('#Imgdiv').height(myimage.height*myzoom/10);
    $('#Imgdiv').width(myimage.width*myzoom/10);
    $('#mycanvas').attr("height",myimage.height*myzoom/10)
    $('#mycanvas').attr("width",myimage.width*myzoom/10)
    drawall();
    setpicture();
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
    else 
    {
        $('#Imgdiv').css("left",0);
    } 
}

function drawall()
{
    canvas=$('#mycanvas')[0];
    context=canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    for (var i=0;i<mydata.length;i++)
    {
        if(mydata[i].flag==1)
        {
            context.beginPath();
            context.shadowBlur = 5;
            context.lineJoin = "round";
            if(choice==i) 
            {
                context.strokeStyle="black";
                context.lineWidth=3;
                context.shadowColor = "black";
            }
            else 
            {
                context.lineWidth=1;
                context.strokeStyle="blue";
                context.shadowColor = "blue";
            }
            drawMark(i);
            context.beginPath();
            if(choice!=i) 
            {
                context.fillStyle="rgba(0,0,255,0.3)";
                context.shadowColor = "blue";
                context.shadowBlur = 15;
            }
            else
            {   
                context.fillStyle="rgba(0,0,0,0.15)";
                context.shadowColor = "black";
                context.shadowBlur = 20;
            }
            drawMarkStar(i);
        }
    }
}

function createMark()
{
    myobject.flag=1;
    mydata[count] =  myobject
    $('#mycontent').append("<textarea id='text"+count+"' class='mytext form-control' placeholder='请输入标注信息'></textarea> ");
    showchoice(count);
    count++;
}

function drawMark(num)
{
    context.moveTo(mydata[num].point[0].x*myzoom/10,mydata[num].point[0].y*myzoom/10);
    for(var i =1;i<mydata[num].point.length;i++)
    {
         context.lineTo(mydata[num].point[i].x*myzoom/10,mydata[num].point[i].y*myzoom/10); 
    }
    context.stroke(); 
    //context.moveTo(mydata[num].x*myzoom/10,mydata[num].y*myzoom/10);
   
}

function drawMarkStar(num)
{
    context.arc(mydata[num].x*myzoom/10,mydata[num].y*myzoom/10,10,0,2*Math.PI)
    context.fill(); 
}

function  showchoice(num)
{
    if(mydata[num]!=undefined&&mydata[num].flag==1)
    {
        setstyle2();
        $('.mytext').hide();
        $('#text'+num).show();
        choice=num;
        drawall();
    }
}

function Myresize()
{
    if(mydata[choice]!=undefined&&mydata[choice].flag==1)
    {
        setstyle2();
    }
    else setstyle1();
}

function Mymousedown(event)
{
    if(post==0) return;
    myobject = new Object();
    myobject.point = new Array();
    myobject.count = 0;
    myobject.point[0]=new Object();
    myobject.point[0].x=(event.clientX-$('#Imgdiv').offset().left)*10/myzoom;
    myobject.point[0].y=(event.clientY-$('#Imgdiv').offset().top)*10/myzoom;
    event.preventDefault();
    canvas=$('#mycanvas')[0];
    context=canvas.getContext("2d");
    context.beginPath();
    context.lineJoin = "round"
    context.strokeStyle="black";
    context.shadowBlur = 2;
    context.shadowColor = "black";
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    $('#Imgdiv').attr("onmousemove","Mymousemove(event)");
    drawflag=1;
    $("#arrow").remove();
}

function Mymousemove(event)
{
    var newpoint =  new Object();
    newpoint.x = (event.clientX-$('#Imgdiv').offset().left)*10/myzoom;
    newpoint.y = (event.clientY-$('#Imgdiv').offset().top)*10/myzoom;
    if(checkdistance(myobject.point[myobject.count],newpoint,10))
    {
        context.moveTo(myobject.point[myobject.count].x*myzoom/10,myobject.point[myobject.count].y*myzoom/10);
        context.lineTo(newpoint.x *myzoom/10,newpoint.y*myzoom/10);
        context.stroke(); 
        myobject.count++;
        myobject.point[myobject.count] = newpoint;
    }
}

function Mymouseup(event)
{
    if(post==0||drawflag==0) return;
    $('#Imgdiv').attr("onmousemove","");
    var newpoint =  new Object();
    newpoint.x = (event.clientX-$('#Imgdiv').offset().left)*10/myzoom;
    newpoint.y = (event.clientY-$('#Imgdiv').offset().top)*10/myzoom;
    if(myobject.count==0&&!checkdistance(myobject.point[myobject.count],newpoint,10))
    {
        for(var i=0;i<mydata.length;i++)
        {
            if(!checkdistance(newpoint,mydata[i],10*myzoom/10))
            {   
                showchoice(i);
                return false;
            }
        }
        return false;
    }
    myobject.count++;
    myobject.point[myobject.count]=newpoint;
    //myobject.point[myobject.count+1]=myobject.point[0];
    event.preventDefault();
    calstar();
    createMark();
    arrow();
    drawflag=0;
    return false;
}

function Mymouseup2(event)
{
    if(post==0||drawflag==0) return;
    drawall();
    $('#Imgdiv').attr("onmousemove","");
    event.preventDefault();
    drawflag=0;
}

function arrow()
{
    $("#wrap").append("<div id='arrow'></div>");
    $("#arrow").css("left",($("#Imgdiv").offset().left+myobject.x*myzoom/10)+$(document).width()*0.1);
    $("#arrow").css("top",($("#Imgdiv").offset().top+myobject.y*myzoom/10-75));
    $("#arrow").attr("class","transition")
    $("#arrow").css("left",($("#Imgdiv").offset().left+myobject.x*myzoom/10));
    $("#arrow").css("opacity",0);
}


function checkdistance(p1,p2,d)
{
    return (p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y)>d*d;
}

function deletechoice()
{
    if(mydata[choice]!=undefined&&post==1)
    {
        setstyle1();
        $('#text'+choice).hide();
        mydata[choice].flag=0;
        for (var i=0;i<mydata.length;i++)
        {
            if(mydata[i].flag==1)
            {
                showchoice(i);
                return;
            }
        }
        deleteall();
    }
}

function deleteall()
{
    if(post==1)
    {
        setstyle1();
        $('.myMark').remove();
        $('.mytext').remove();
        mydata = new Array();
        count=0;
        drawall();
    }
}

function setmousein(num)
{
    mousein=num;
}

function keyDown(event)
{
    if(mousein==1)
    {
        if(event.which==187 || event.which==61)
        {
            myzoom++;
            Myreset();
        }
        else if(event.which==189 || event.which==173)
        {
            myzoom--;
            Myreset();
        }
    }
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
                sendobject.point = mydata[i].point;
                sendobject.data = $('#text'+i).val();
                senddata[j] = sendobject;
                j++;
            }
        }
        post=0;
        $('.mytext').attr("readonly","true");
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('post',window.location.href,true);
        xmlhttp.onreadystatechange = readyStateChanged;
        xmlhttp.send(JSON.stringify(senddata));
    }
}
