var mongoose = require('mongoose');

// init all models
require('./models_init.js').do();

var jparser = require('./model_output.js');
var menu = require('./gui_menu.js');

var Aos_subject;
var jint = new Number(0);

exports.votefor = function(req, res){

    var winner = req.params.winnerid;
    var loser = req.params.loserid;
    var winpts = parseInt(req.params.winpts);
    var losepts = parseInt(req.params.losepts);

    // Rating Elo
    var ew = 1 / (1 + Math.pow(10,(losepts-winpts)/400));
    var el = 1 - ew;
    var ra = winpts + 120 * (1-ew);
    var rb = losepts + 120 * (0-el);
    winpts = Math.round(ra);
    losepts = Math.round(rb);

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
                var query1 = { _id: winner };
                picts.update(query1,{rating : winpts},function(err, upd_cnt1)
                    //girls.findOneAndUpdate(query1,{rating : winpts},function(err, upd_cnt1)
                {
                    if (upd_cnt1 > 0)
                    {
                        var query2 = { _id: loser };
                        picts.update(query2,{rating : losepts},function(err, upd_cnt2)
                            //girls.findOneAndUpdate(query2,{rating : losepts},function(err, upd_cnt2)
                        {
                            if (upd_cnt2 > 0)
                            {
                                text += "Views: " + jint + "<br>";
                                text += "Thank you for voting!";
                                text += "<br> <a href=\"/\">one more time!</a><br>";
                                db.close();

                                //res.send(text);

                                // redirect
                                res.redirect("/");
                            } else
                            {
                                console.log("shlyapa, upd_cnt2 == 0, id: ijf2093j0f92j3f092j0932jf");
                                db.close();
                                res.redirect("/");
                            }
                        });
                    } else
                    {
                        console.log("shlyapa, upd_cnt1 == 0, id: ijf2093j0f92j3f092j0932jf");
                        db.close();
                        res.redirect("/");
                    }
                });
            }
        });
    });
};