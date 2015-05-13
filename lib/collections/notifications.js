Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
    fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createAnswerNotification = function(answer) {
  var post = Posts.findOne(answer.postId);
  if (answer.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      answerId: answer._id,
      answererName: answer.author,
      read: false
    });
  }
};
