var models = ['./pictures_schema.js'];

exports.do = function() {
    var len = models.length;
    for (var i = 0; i < len; i++) {
        require(models[i])();
    }
};