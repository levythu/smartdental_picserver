$(document).ready(function()
{
    $("#input-tooth").html("");
    for (var i=1;i<=32;i++)
    {
        $("#input-tooth")[0].innerHTML+="<option value="+i+">"+i+"</option>";
    }
    $("#submitter").click(function()
    {
        if ($("#input-uid")[0].value=="")
        {
            alert("请输入一个用户id");
            return false;
        }
        if ($("#upFile")[0].value=="")
        {
            alert("请选择上传图片");
            return false;
        }


        if ($("#input-name")[0].value=="")
        {
            alert("请输入一个病历名称");
            return false;
        }

        if ($("#input-area")[0].value=="")
        {
            alert("请输入该病理图片的病患区域");
            return false;
        }

        if ($("#input-diagnose")[0].value=="")
        {
            alert("请输入该病理图片的诊断结果");
            return false;
        }

        if ($("#input-tooth")[0].value=="")
        {
            alert("请输入该病理图片的牙齿编号");
            return false;
        }

        if ($("#input-treatment")[0].value=="")
        {
            alert("请输入治疗方案");
            return false;
        }
    });
});
