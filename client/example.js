Template.main.events = {
	"click button[name='bcrypt']": function (evt) {
		Meteor.call("bcrypt", $("input[name='value']").val(), function (error, result) {
			if (!error) {
				$("input[name='result']").val(result);
			}
		});
	}
};