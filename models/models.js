var mongojs = require('mongojs');
var picrcd = "picrcd";

exports.picrcd = picrcd

exports.db = mongojs('mongodb://localhost/smartdental', [picrcd]);
