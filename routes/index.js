var mongoose = require('mongoose');

// init all models
require('./models_init.js').do();

var jparser = require('./model_output.js');
var menu = require('./gui_menu.js');

var Aos_subject;
var jint = new Number(0);

exports.fight = function(req, res){

    var start = Date.now();

    var text = "";

    var name = 'pictures';
    picts = mongoose.model(name);

    jint++;

    // ?poolSize=4');   // example ('mongodb://user:pass@localhost:port/database');
    // //poolSize is reserved connections for application
    mongoose.connect('mongodb://localhost:27017/the_best_pictures', function()
    {
        var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(err)
        {
            if (!err)
            {
                //var query = Aos_subject.find( { directory: {$gte: 0.4, $lte: 0.6} } ); //{});

                var query = picts.find( { } );
                query.exec(function(err,my_picts)
                    //girls.count({}, function(err, cnt)
                {
                    var cnt = my_picts.length;
                    if (cnt >= 2)
                    {
                        var ind1 = Math.floor(Math.random() * cnt);
                        var ind2 = Math.floor(Math.random() * cnt);
                        while (ind1 == ind2)
                        {
                            ind2 = Math.floor(Math.random() * cnt);
                        }

                        text += "<font face='Helvetica' size='4'>";
                        text += menu.draw();

                        text += "<table align='center'>";
                        text += "<tr>";
                        text += "<td align='center'>" + my_picts[ind1].name + "</td>";
                        text += "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
                        text += "<td align='center'>" + my_picts[ind2].name + "</td>";
                        text += "</tr>";
                        text += "<tr>";
                        text += "<td align='center'>" + my_picts[ind1].rating + " pts.</td>";
                        text += "<td></td>";
                        text += "<td align='center'>" + my_picts[ind2].rating + " pts.</td>";
                        text += "</tr>";
                        text += "<tr>";

                        var img1src, img2src, isBase64 = true;
                        if (isBase64)
                        {
                            img1src = my_picts[ind1].imgprefix + my_picts[ind1].imgsrc;
                            img2src = my_picts[ind2].imgprefix + my_picts[ind2].imgsrc;
                        } else
                        {
                            img1src = my_picts[ind1].imgpath;
                            img2src = my_picts[ind2].imgpath;
                        }
                        text += "<td align='center'>" + "<img src='" + img1src + "' height='300px'>" + "</td>";
                        text += "<td></td>";
                        text += "<td align='center'>" + "<img src='" + img2src + "' height='300px'>" + "</td>";
                        text += "</tr>";
                        text += "<tr>";
                        text += "<td align='center'>" + "<font size='5'><a href=\"/votefor/"+my_picts[ind1]._id+"/"+my_picts[ind1].rating+"/"+my_picts[ind2]._id+"/"+my_picts[ind2].rating+"\">This!</a> " + "</font></td>";
                        text += "<td></td>";
                        text += "<td align='center'>" + "<font size='5'><a href=\"/votefor/"+my_picts[ind2]._id+"/"+my_picts[ind2].rating+"/"+my_picts[ind1]._id+"/"+my_picts[ind1].rating+"\">This!</a> " + "</font></td>";
                        text += "</tr>";
                        text += "</table>";

                        text += "<br><br><div align='center'>" + "from:" + req.connection.remoteAddress + "</div>";
                        text += "<br><br><div align='center'>" + (Date.now() - start).toString() + " ms to load page" + "</div>";
                        text += "<div align='center'>Views: " + jint + "<div align='center'>";

                        text += "</font>";

                        res.send(text);
                        console.log(req.connection.remoteAddress);

                        db.close();
                    }
                    else
                    {
                        text += "<font face='Helvetica' size='4'>";

                        text += "<div align='center'>It's impossible, not enough pictures to compete... please add at least two</div><br>";
                        text += menu.draw();

                        text += "</font>";

                        res.send(text);
                        db.close();
                    }
                });

            }
        });
    });
};