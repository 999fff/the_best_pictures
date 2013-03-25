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

    var name = 'girls';
    girls = mongoose.model(name);

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
            var query = girls.find( { } ); //{});
            query.exec(function(err,my_girls)
            {
                if (!err)
                {
                    if (!my_girls)
                    {
                        console.log(err);
                    }
                    else
                    {
                        /*text += "Views: " + jint + "<br>";
                        text += "<a href='/'>home</a>" + "<br>";
                        text += "<a href='/mongo_test'>mongo_test</a>" + "<br>";
                        text += "<a href='/mongo_view'>mongo_view</a>" + "<br>";
                        text += "<a href='/mongo_query'>mongo_query (show all)</a>" + "<br>";
                        text += "<a href='/mongo_add1'>mongo_add1</a>" + "<br>";
                        text += "<a href='/mongo_update'>mongo_update</a>" + "<br>";
                        text += "<a href='/mongo_remove'>mongo_remove</a>" + "<br>";
                        text += "<a href='/mongo_remove_all_subdocs'>mongo_remove_all_subdocs</a>" + "<br>";
                        //text += "<a href='/mongo_remove_ind_id/99/514723e5e38f0af011000064/'>mongo_remove_ind_id</a>" + " ";
                        text += "<a href='/mongo_remove_ind_id/3/514723e5e38f0af011000064/'>mongo_remove_ind_id</a>" + "<br>";

                        // mongo_remove_by_input
                        // parsed like that
                        //var jind = req.query['jind']; var jobjid = req.query['jobjid'];
                        text += "<form action=\"/mongo_remove_by_input\" method=\"get\">";
                        text += "mongo_remove_by_input ";
                        text += "<input name=\"jind\" type=\"text\" size=\"4\" value=\"99\"></input>"
                        text += " <input name=\"jobjid\" type=\"text\" size=\"24\" value=\"514723e5e38f0af011000064\"></input>";
                        text += "<input type=\"submit\" value=\"remove\">";
                        text += "</form>" + "<br>";

                        text += new Date(); // + obj1.input + " " + obj2.input);
                        text += "<br><br>" + "from:" + req.connection.remoteAddress;

                        text += "<br><br>"+"my_girls.length = " + my_girls.length + "<br>";
                        var n = my_girls.length;
                        //for (var i = 0 ; i < n; i++)
                        //  text += "<br>" + (i+1) + ") " + my_girls[i].directory;

                        text += "<br>" + (Date.now() - start) + " ms to load<br>";
                        var isBeauty = true;
                        if (isBeauty)
                        {
                            // +70 ms to parse 500 docs (~900 kb)
                            text += jparser.jparse(my_girls);
                        }
                        else
                        {
                            text += my_girls;
                        }

                        text += "<br>" + (Date.now() - start) + " ms to load";
                        */

                        text += "Views: " + jint + "<br>";

                        /*text += "<a href='/'>home</a>" + "<br>";
                         text += "<a href='/scores'>scores</a>" + "<br>";
                         text += "<a href='/add1'>add1_random</a>" + "<br>";
                         text += new Date();*/
                        text += menu.draw();

                        text += "<br><br>" + "from:" + req.connection.remoteAddress;
                        text += "<br><br>"+"my_girls.length = " + my_girls.length + "<br>";
                        var isBeauty = true;
                        if (isBeauty)
                        {
                            // +70 ms to parse 500 docs (~900 kb)
                            text += jparser.jparse(my_girls);
                        }
                        else
                        {
                            text += my_girls;
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