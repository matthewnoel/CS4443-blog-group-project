const onSuccess = function () {
  console.log("Success");
};

const onError = function (message) {
  console.log("Error");
};

/* 
  TODO:
  This method should return an HTML element where a user can create a new blog post.
  You will call Utils.makeBlogPost(title, body, onSuccess, onError) to create the post in the database.
  Your element will be appended to the main element of the document.
  Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
*/
function getNewPostContainer() {
  // Uncomment the following line to use the testing version of the page
  // return Tests.testGetNewPostContainer();

  console.log("Called getNewPostContainer");
  return null;
}

main(Pages.POST);
