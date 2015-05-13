Template.answerSubmit.onCreated(function() {
	Session.set('answerSubmitErrors', {});
});

Template.answerSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('answerSubmitErrors') [field];
	},
	errorClass: function(field) {
		return !!Session.get('answerSubmitErrors') [field] ? 'has-error' : '';
	}
});

Template.answerSubmit.events ({
	'submit form': function(e, template) {
		e.preventDefault();

		var $body = $(e.target).find('[name=body]');
		var answer = {
			body: $body.val(),
			postId: template.data._id
		};

		var errors = {};
		if(! answer.body) {
			errors.body = "Please write something";
			return Session.set('answerSubmitErrors', errors);
		}

		Meteor.call('answerInsert', answer, function(error, answerId) {
			if(error){
				throwError(error.reason);
			} else {
				$body.val('');
			}
		});
	}
});