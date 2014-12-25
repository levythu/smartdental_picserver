var mongojs = require('mongojs');
var picrcd = "picrcd";
var user = "users";

exports.picrcd = picrcd;
exports.user = user;

exports.db = mongojs('mongodb://localhost/smartdental', [picrcd,user]);
