var mongoose = require('mongoose');
var fs = require('fs');

// init all models
require('./models_init.js').do();

var menu = require('./gui_menu.js');
var Aos_subject;
var jint = new Number(0);

exports.getfile = function(req, res){

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
        /*http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
        var newname = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });*/
        var newname = 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        var newpath = __dirname + "/../public/the_best_pictures/" + newname;
        var newurl = "/the_best_pictures/" + newname;

        fs.writeFile(newpath, data, function (err)
        {
            mongoose.connect('mongodb://localhost:27017/the_best_pictures'); // ?poolSize=4');   // example ('mongodb://user:pass@localhost:port/database');
            //poolSize is reserved connections for application

            var db = mongoose.connection;

            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function(err)
            {
                if (!err)
                {
                    var new_pict = new picts();
                    new_pict.name = name;
                    new_pict.rating = rating;
                    new_pict.imgpath = newurl;

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