Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var post = {
      question: $(e.target).find('[name=question]').val()
    };

    Meteor.call('postInsert', post, function(error, result) {
      	// display the error to the user and abort
    	if (error)
          return Errors.throw(error.reason);
        
    	//show this result but route anyway
    	if(result.postExists)
    		Errors.throw('This question has already been posted');

    // Router.go('postPage', {_id: result._id});
    });
    
  Router.go('postsList');
    
  }
});