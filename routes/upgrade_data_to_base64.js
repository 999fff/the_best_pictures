var mongoose = require('mongoose');
var fs = require('fs');

// init all models
require('./models_init.js').do();

var jparser = require('./model_output.js');

var Aos_subject;
var jint = new Number(0);

exports.upgrade_data_to_base64 = function(req, res){
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
                var query = { imgsrc: { $exists: false} };

                picts.find(query, function(err,data)
                {
                    var len = data.length;
                    var it = 0;

                    if (len == 0)
                    {
                        text += "Nothing to upgrade";
                        res.send(text);
                        db.close();
                        return;
                    }

                    for (var i = 0; i < len; i++)
                    {
                        var imagepath = __dirname + "/../public" + data[i].imgpath;
                        var ind = i;

                        var img = fs.readFileSync(imagepath);
                        var img2 = img.toString('base64');
                        // TODO: it's not correct to use such data prefix without detecting image type
                        var prefix = "data:image/jpeg;base64,";
                        //text += "<img src='" + prefix + img2 + "' height=100px><br>";

                        picts.findByIdAndUpdate(data[ind]._id, {imgprefix: prefix, imgsrc: img2}, function(err)
                        {
                            it++;
                            if (it == len)
                            {
                                res.send(it + " objects has been updated, now it's safe to delete them");
                                db.close();
                            }
                        });

                        /*
                        TODO: async is not working
                        fs.readFile(imagepath, function(img)
                        {
                            console.log(ind + " " + data[ind].name + " " + data[ind].imgpath);
                            var img2 = img.toString('base64');
                            // TODO: it's not correct to use such data prefix without detecting image type
                            var prefix = "data:image/jpeg;base64,";
                            //text += "<img src='" + prefix + img2 + "' height=100px><br>";
                            var query2 = { imgsrc: { $exists: false} };
                            picts.findByIdAndUpdate(data[ind]._id, [{imgprefix: prefix},{imgsrc: img2}], function(err)
                            {
                                it++;
                                if (it == len)
                                {
                                    res.send(it + " objects has been updated");
                                    db.close();
                                }
                            });
                        });*/
                    }
                });
            }
        });
    });
};