function turnToEdit()
{
    if ($("#input-name")[0].value=="")
        return;
    window.location="/edit?caseid="+$("#input-name")[0].value;
}
function judgeEnter(e)
{
    var ob = e || event;
    var keyCode = ob.keyCode;

    if (keyCode==13)
    {
        turnToEdit();
        return false;
    }
}

$(document).ready(function()
{
    $("#input-name").keypress(judgeEnter);
});
