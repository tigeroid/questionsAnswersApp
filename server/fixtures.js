if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  //create two users
  var henryId = Meteor.users.insert({
    profile: {name: 'Henry Tano'}
  });

  var henry = Meteor.users.findOne(henryId);

  var jacId = Meteor.users.insert({
    profile: {name: 'Jac Tano'}
  });

  var jac = Meteor.users.findOne(jacId);

  var questionOneId = Posts.insert ({
    question: 'How to prove that you are not dreaming?',
    userId: henry._id,
    author: henry.profile.name,
    submitted: new Date(now - 7 * 3600 * 1000),
    answersCount: 2
  });

  Answers.insert({
    postId: questionOneId,
    userId: jac._id,
    author: jac.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Pinched yourself and see if you feel the pain.'
  });

  Answers.insert({
    postId: questionOneId,
    userId: henry._id,
    author: henry.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'So you are saying that you will not feel pain when you are dreaming?'
  });

  Posts.insert({
    question: 'How to prove 1 + 1 = 2',
    userId: jac._id,
    author: jac.profile.name,
    submitted: new Date(now - 10 * 3600 * 1000),
    answersCount: 0
  });

  for(var i = 0; i < 10; i++) {
    Posts.insert({
      question: 'Test question #' + i,
      author: henry.profile.name,
      userId: henry._id,
      submitted: new Date(now - i * 3600 * 1000),
      answersCount: 0
      });
    }
  }
