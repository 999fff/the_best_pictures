exports.draw = function()
{
    var text ="";
    text += "<div align='center'><a href='/' align='center'>FIGHT!</a></div>" + "<br>";
    text += "<div align='center'><a href='/scores' align='center'>scores</a></div>" + "<br>";
    //text += "<a href='/add_random'>add1_random</a>" + "<br>";
    text += "<div align='center'><a href='/add1'>add1</a></div>" + "<br>";
    //text += "<div align='center'>" + new Date() + "</div><br>";
    return text;
}