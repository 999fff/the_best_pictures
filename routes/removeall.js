var mongoose = require('mongoose');

// init all models
require('./models_init.js').do();

var jparser = require('./model_output.js');

var Aos_subject;
var jint = new Number(0);

exports.removeall = function(req, res){
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
                picts.remove({},function(err, upd_cnt)
                {
                    if (upd_cnt > 0)
                    {
                        res.redirect('/');
                        db.close();
                    } else
                    {
                        console.log("Nothing to remove, id: ijf2093j0f92j3f092j0932jf");
                        res.redirect('/');
                        db.close();
                    }
                });
            }
        });
    });
};