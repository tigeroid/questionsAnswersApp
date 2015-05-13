Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) {return ownsDocument(userId, post); },
  remove: function(userId, post) {return ownsDocument(userId, post); },
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    //may only edit the following field
    return (_.without(fieldNames, 'question').length > 0);
  }
});

validatePost = function (post) {
  var errors = {};

  if (!post.question)
    errors.question = "Please fill in a question";

  return errors;
}

Meteor.methods({
  postInsert: function(postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      question: String
    });

    // if (Meteor.isServer) {
    //   postAttributes.question += "(server)";
    //   // wait for 5 seconds
    //   Meteor._sleepForMs(5000);
    // } else {
    //   postAttributes.question += "(client)";
    // }

    var errors = validatePost(postAttributes);
    if(errors.question)
    	throw new Meteor.Error('invalid-post', "You must set a question");

    var postWithSameQuestion = Posts.findOne({question: postAttributes.question});
    if(postWithSameQuestion) {
    	return {
    		postExists: true,
    		_id: postWithSameQuestion._id
    	}
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      answersCount: 0
    });

    var postId = Posts.insert(post);


    return {
      _id: postId
    };
  }
});
