var mongoose = require('mongoose');
//var fs = require('fs');

// init all models
require('./models_init.js').do();

var jparser = require('./model_output.js');
var menu = require('./gui_menu.js');

var Aos_subject;
var jint = new Number(0);

exports.scores = function(req, res){

    var start = Date.now();

    var text = "";

    var name = 'pictures';
    picts = mongoose.model(name);

    jint++;

    // ?poolSize=4');   // example ('mongodb://user:pass@localhost:port/database');
    //poolSize is reserved connections for application
    mongoose.connect('mongodb://localhost:27017/the_best_pictures', function()
    {
        var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(err)
        {
            if (!err)
            {
                picts.find({},{},{sort:[['rating',-1]]},
                    function(err,my_picts)
                    {
                        if (!err)
                        {
                            if (!my_picts)
                            {
                                console.log(err);
                            }
                            else
                            {
                                text += "<font face='Helvetica' size='4'>";
                                text += menu.draw();

                                var isBeauty = true;
                                if (isBeauty)
                                {
                                    // +70 ms to parse 500 docs (~900 kb)
                                    //text += jparser.jparse(my_picts);
                                    text += "<table align='center'>";
                                    for (var i =0; i < my_picts.length; i++)
                                    {
                                        //text += my_picts[i].name + " " + my_picts[i].rating + "<br>";
                                        text += "<tr>";
                                        text += "<td align='center'><img src='" + my_picts[i].imgpath + "' height='150px'></td>";
                                        text += "<td>" + my_picts[i].name + "</td>";
                                        text += "<td>" + my_picts[i].rating + "</td>";
                                        text += "</tr>";
                                    }
                                    text += "<table>";
                                }
                                else
                                {
                                    text += my_picts;
                                }

                                text += "<br><br><div align='center'>" + "from:" + req.connection.remoteAddress + "</div>";
                                text += "<br><br><div align='center'>" + (Date.now() - start).toString() + " ms to load page" + "</div>";
                                text += "<div align='center'>Views: " + jint + "<div align='center'>";
                                text += "</font>";

                                res.send(text);
                                console.log(req.connection.remoteAddress);

                                db.close();
                            }
                        }
                    });
            }
        });
    });
};