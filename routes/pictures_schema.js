// from http://stackoverflow.com/a/10083152
var mongoose = require('mongoose');

module.exports = function()
{
    {
        // Main Schema
        var pictures = new mongoose.Schema({
            name:  String,
            rating: Number,
            imgpath: String
        });
    }

    var name = 'pictures';
    try {
        mongoose.model(name);
    } catch (e) {
        mongoose.model(name, pictures);
    }
};