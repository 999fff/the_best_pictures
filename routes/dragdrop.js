var menu = require('./gui_menu.js');
var jint = new Number(0);

exports.dragdrop = function(req, res){

    var start = Date.now();

    var text = "";

    jint++;

    text += "<div onClick='alert(1234);'>clickOnMe" + "</div>";

    text +=
        "<style type='text/css'>" + "\n" +
        "#drop {" + "\n" +
            "min-height: 150px;" + "\n" +
            "width: 250px;" + "\n" +
            "border: 1px solid blue;" + "\n" +
            "margin: 10px;" + "\n" +
            "padding: 10px;" + "\n" +
            "}" + "\n" +
        "</style>" + "\n";

    text +=
        "<script type='text/javascript'>//<![CDATA[ " + "\n" +
        "if(window.FileReader) {" + "\n" +
        "var drop;" + "\n" +
        "addEventHandler(window, 'load', function() {" + "\n" +
        "var status = document.getElementById('status');" + "\n" +
        "drop   = document.getElementById('drop');" + "\n" +
        "var list   = document.getElementById('list');" + "\n" +

        "function cancel(e) {" + "\n" +
        "if (e.preventDefault) { e.preventDefault(); }" + "\n" +
        "return false;" + "\n" +
        "}" + "\n" +

        "addEventHandler(drop, 'dragover', cancel);" + "\n" +
        "addEventHandler(drop, 'dragenter', cancel);" + "\n" +

        "addEventHandler(drop, 'drop', function (e) {" + "\n" +
        "e = e || window.event;" + "\n" +
        "if (e.preventDefault) { e.preventDefault(); }" + "\n" +

        "var dt    = e.dataTransfer;" + "\n" +
        "var files = dt.files;" + "\n" +
        "for (var i=0; i<files.length; i++) {" + "\n" +
        "var file = files[i];" + "\n" +
        "var reader = new FileReader();" + "\n" +

        "reader.readAsDataURL(file);" + "\n" +
        "addEventHandler(reader, 'loadend', function(e, file) {" + "\n" +
        "var bin           = this.result;" + "\n" +
        "var newFile       = document.createElement('div');" + "\n" +
        "newFile.innerHTML = 'Loaded : '+file.name+' size '+file.size+' B';" + "\n" +
        "list.appendChild(newFile);" + "\n" +
        "var fileNumber = list.getElementsByTagName('div').length;" + "\n" +
        "status.innerHTML = fileNumber < files.length" + "\n" +
        "? 'Loaded 100% of file '+fileNumber+' of '+files.length+'...'" + "\n" +
        ": 'Done loading. processed '+fileNumber+' files.';" + "\n" +

        "var img = document.createElement(\"img\");" + "\n" +
        "img.file = file;" + "\n" +
        "img.src = bin;" + "\n" +
        "list.appendChild(img);" + "\n" +
        "}.bindToEventHandler(file));" + "\n" +
        "}" + "\n" +
        "return false;" + "\n" +
        "});" + "\n" +
        "Function.prototype.bindToEventHandler = function bindToEventHandler() {" + "\n" +
        "var handler = this;" + "\n" +
        "var boundParameters = Array.prototype.slice.call(arguments);" + "\n" +

        "return function(e) {" + "\n" +
        "e = e || window.event;" + "\n" +
        "boundParameters.unshift(e);" + "\n" +
        "handler.apply(this, boundParameters);" + "\n" +
        "}" + "\n" +
        "};" + "\n" +
        "});" + "\n" +
        "} else {" + "\n" +
        "document.getElementById('status').innerHTML = 'Your browser does not support the HTML5 FileReader.';" + "\n" +
        "}" + "\n" +
        "function addEventHandler(obj, evt, handler) {" + "\n" +
        "if(obj.addEventListener) {" + "\n" +
        "obj.addEventListener(evt, handler, false);" + "\n" +
        "} else if(obj.attachEvent) {" + "\n" +
        "obj.attachEvent('on'+evt, handler);" + "\n" +
        "} else {" + "\n" +
        "obj['on'+evt] = handler;" + "\n" +
        "}" + "\n" +
        "}" + "\n" +
        "//]]>" + "\n" +
        "</script>" + "\n";

    text +=
    "<DIV id='status'>Drag the files from a folder to a selected area ...</DIV>"+
    "<DIV id='drop'>Drop files here.</DIV>"+
    "<DIV id='list'></DIV>";




    text += "<br>" + menu.draw();

    res.send(text);
};