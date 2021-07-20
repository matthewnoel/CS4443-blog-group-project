/* 
  TODO:
  This method should return an HTML element displaying a blog post, or a message
  that it could not be found. Your element will be appended to the main element of the document.
  Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
*/
function getPostContainer(post_obj) {
  return Tests.testGetPostContainer(post_obj);

  console.log("Called getPostContainer");
  if (post_obj == null) {
    console.log('A post matching query parameter "p" does not exits.');
    return null;
  }

  console.log(post_obj);
  return null;
}

main(Pages.VIEW);
