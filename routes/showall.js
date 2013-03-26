var mongoose = require('mongoose');

// init all models
require('./models_init.js').do();

var jparser = require('./model_output.js');
var menu = require('./gui_menu.js');

var Aos_subject;
var jint = new Number(0);

exports.showall = function(req, res){

    var start = Date.now();

    var text = "";

    var name = 'pictures';
    picts = mongoose.model(name);

    jint++;

    mongoose.connect('mongodb://localhost:27017/girls_fight'); // ?poolSize=4');   // example ('mongodb://user:pass@localhost:port/database');
    //poolSize is reserved connections for application

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(err)
    {
        if (!err)
        {
            //var query = Aos_subject.find( { directory: {$gte: 0.4, $lte: 0.6} } ); //{});
            var query = picts.find( { } ); //{});
            query.exec(function(err,my_picts)
            {
                if (!err)
                {
                    if (!my_picts)
                    {
                        console.log(err);
                    }
                    else
                    {
                        text += "Views: " + jint + "<br>";

                        text += menu.draw();

                        text += "<br><br>" + "from:" + req.connection.remoteAddress;
                        text += "<br><br>"+"my_picts.length = " + my_picts.length + "<br>";
                        var isBeauty = true;
                        if (isBeauty)
                        {
                            // +70 ms to parse 500 docs (~900 kb)
                            text += jparser.jparse(my_picts);
                        }
                        else
                        {
                            text += my_picts;
                        }
                        text += "<br>" + (Date.now() - start) + " ms to load";  // time to load

                        res.send(text);

                        db.close();
                    }
                }
            });
        }
    });
};