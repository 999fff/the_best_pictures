
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
    , scores = require('./routes/scores.js')
    , add_random = require('./routes/add_random.js')
    , showall = require('./routes/showall.js')
    , votefor = require('./routes/votefor.js')
    , fix = require('./routes/fix.js')
    , add1 = require('./routes/add1.js')
    , getfile = require('./routes/getfile.js')
    , removeid = require('./routes/removeid.js')
    , removeall = require('./routes/removeall.js')
    , dragdrop = require('./routes/dragdrop.js')
    , getfile_b64 = require('./routes/getfile_b64.js')
    , upgrade_data_to_base64 = require('./routes/upgrade_data_to_base64.js');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 36363);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.fight);
app.get('/users', user.list);
app.get('/scores', scores.scores);
app.get('/add1', add1.add1);
//private
app.get('/showall', showall.showall);
app.get('/votefor/:winnerid/:winpts/:loserid/:losepts', votefor.votefor);
app.get('/fix', fix.fix);
app.get('/add_random', add_random.add_random);
app.post('/getfile', getfile.getfile);
app.get('/removeid/:id', removeid.removeid);
app.get('/removeall', removeall.removeall);
app.get('/dragdrop', dragdrop.dragdrop);
app.post('/getfile_b64', getfile_b64.getfile_b64);
app.get('/upgrade_data_to_base64', upgrade_data_to_base64.upgrade_data_to_base64);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
