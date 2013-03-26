var mongoose = require('mongoose');

// init all models
require('./models_init.js').do();

var menu = require('./gui_menu.js');
var Aos_subject;
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

exports.add_random = function(req, res){

    var start = Date.now();

    var text = "";

    var name = 'pictures';
    girls = mongoose.model(name);

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
                var new_girl = new girls();
                new_girl.name = rand_name();
                new_girl.rating = 1200;
                new_girl.imgpath = rand_name() +"/" + rand_name() +"/" + rand_name();

                try
                {
                    new_girl.save(function(err, subjs)
                    {
                        if (!err)
                        {
                            girls.count({}, function(err, cnt)
                            {
                                text += "Views: " + jint + "<br>";

                                text += menu.draw();

                                text += "<br><br>" + "from:" + req.connection.remoteAddress;
                                text += "<br><br>"+"my_girls.length = " + cnt + "<br>";
                                res.send(text);

                                db.close();
                            });
                        }
                        else
                        {
                            console.log(err);
                        }
                    });
                }
                catch (e)
                {
                    console.log(e);
                }

            }
        });
    });
};