Meteor.publish('posts', function(options) {
	check(options, {
		sort: Object,
		limit: Number
	});
  return Posts.find({}, options);
});

Meteor.publish('answers',
function(postId) {
	check(postId, String);
  return Answers.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId:this.userId, read: false});
});
