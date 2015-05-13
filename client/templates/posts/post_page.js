Template.postPage.helpers({
  answers: function() {
    return Answers.find({postId: this._id});
  }
});