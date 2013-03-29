var mongoose = require('mongoose');
var fs = require('fs');

// init all models
require('./models_init.js').do();

var menu = require('./gui_menu.js');
var Aos_subject;
var jint = new Number(0);

exports.getfile_b64 = function(req, res){

    var start = Date.now();

    var text = "";

    var name = 'pictures';
    picts = mongoose.model(name);

    jint++;

    var imagepath = req.files.image.path;
    var name = req.body.name;
    var rating = new Number(1200);

    fs.readFile(imagepath, function (err, data)
    {
        var img = new Buffer(data.toString(), 'binary').toString('base64');
        var data_uri_prefix = "data:" + req.files.image.type + ";base64,";

        img = data.toString('base64');

        //var img2 = img.toString('binary');
        //var img3 = img2.toString('base64');
        //img = img3;
        //res.send('<img src="' + data_uri_prefix + img + '"/>');

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
                    var new_pict = new picts();
                    new_pict.name = name;
                    new_pict.rating = rating;

                    new_pict.imgsrc = img;
                    new_pict.imgprefix = data_uri_prefix;

                    new_pict.save(function(err, subjs)
                    {
                        if (!err)
                        {
                            db.close();
                            res.redirect("/");
                        }
                        else
                        {
                            console.log(err);
                        }
                    });


                }
            });
        });

    });


};