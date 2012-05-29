Meteor.methods({
	bcrypt: function (value) {
		var bcrypt = require("bcrypt");
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(value, salt);
		return hash;
	}
});