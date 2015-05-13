Answers = new Mongo.Collection('answers');

Meteor.methods({
	answerInsert: function(answerAttributes) {
		check(this.userId, String);
		check(answerAttributes, {
			postId: String,
			body: String,
		});

		var user = Meteor.user();
		var post = Posts.findOne(answerAttributes.postId);

		if (!post)
			throw new Meteor.Error('invalid-answer', 'You must answer a question');

		answer = _.extend(answerAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		//update the post with the number of answers
		Posts.update(answer.postId, {$inc: {answersCount: 1}});

		//create the answer, save the id
		answer._id = Answers.insert(answer);

		//now create a notification, informing the user that there's been a comment
		createAnswerNotification(answer);
		
		return answer._id;
	}
});
