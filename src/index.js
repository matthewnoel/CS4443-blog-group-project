function getBlogsListContainer(blog_objs) {
  /* 
    TODO:
    This method should return an HTML element containing a list of blogs a reader
    can choose. You will need to link to the /blog page for each blog and pass the
    blog name as the query parameter 'n' to the blog page. Your element will be 
    appended to the main element of the document.
    Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
  */
  console.log("Called getBlogsListContainer");
  if (blog_objs.length === 0) {
    console.log("There are no blogs");
    return null;
  }
  for (const blog_obj of blog_objs) {
    console.log("index.js", blog_obj);
  }
  return null;
}

Utils.initQuery("index");
