/* 
  TODO:
  This method should return an HTML element displaying a blog and its posts, or a message
  that it could not be found or is empty. Consider adding a link that will send you to the
  /view page for the post. You will need to pass the post id as the query parameter 'p' to
  the view page. Your element will be appended to the main element of the document.
  Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
*/
function getPostListContainer(post_objs) {
  // Uncomment the following line to use the testing version of the page
  // return Tests.testGetPostListContainer(post_objs);

  console.log("Called getPostListContainer");

  if (post_objs == null) {
    console.log('A blog matching query parameter "n" does not exits.');
    return null;
  }
  if (post_objs.length === 0) {
    console.log("This blog has no posts");
    return null;
  }
  for (const post_obj of post_objs) {
    console.log(post_obj);
  }

  return null;
}

main(Pages.BLOG);
