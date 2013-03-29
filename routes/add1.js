var menu = require('./gui_menu.js');
var jint = new Number(0);

function rand_name()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

exports.add1 = function(req, res){

    var start = Date.now();

    var text = "";

    jint++;

    text += "<form action='/getfile_b64' method='post' enctype='multipart/form-data'>";
    text += "Add new picture<br>";
    text += "<input name='name' type='text' ></input> <br>"
    text += "<input name='image' type='file' ></input> <br>"
    text += "<input type='submit' value='send'>";
    text += "</form>" + "<br>";

    res.send(text);
};