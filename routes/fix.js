var mongoose = require('mongoose');

// init all models
require('./models_init.js').do();

var jparser = require('./model_output.js');

var Aos_subject;
var jint = new Number(0);

exports.fix = function(req, res){
    var start = Date.now();

    var text = "";

    var name = 'pictures';
    picts = mongoose.model(name);

    jint++;

    mongoose.connect('mongodb://localhost:27017/the_best_pictures'); // ?poolSize=4');   // example ('mongodb://user:pass@localhost:port/database');
    //poolSize is reserved connections for application

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(err)
    {
        if (!err)
        {
            var query = { name: 'Alena' };
            var pts = 1200+13+13-13-13;

            picts.update(query,{rating : pts},function(err, upd_cnt)
            {
                if (upd_cnt > 0)
                {
                    text += "Views: " + jint + "<br>";
                    text += "Thank you for fixing!";
                    text += "<br> <a href=\"/\">one more time!</a><br>";
                    db.close();

                    res.send(text);
                } else
                    console.log("shlyapa, upd_cnt == 0, id: ijf2093j0f92j3f092j0932jf");
            });
        }
    });
};