const onSuccess = function () {
  console.log("Success");
};

const onError = function (message) {
  console.log("Error");
};

function getPostManagerListContainer(post_objs) {
  /* 
    TODO:
    This method should return an HTML element containing a list of posts that the
    user may delete. You will call Utils.deleteBlogPost(id, onSuccess, onError) to delete.
    Your element will be appended to the main element of the document.
    Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
  */
  console.log("Called getPostManagerListContainer");
  if (post_objs == null) {
    console.log("cannot view posts of a person not logged in");
    return null;
  }
  if (post_objs.length === 0) {
    console.log("user has no posts");
    return null;
  }
  for (const post_obj of post_objs) {
    console.log(post_obj);
  }

  return null;
}

Utils.initQuery("profile");
