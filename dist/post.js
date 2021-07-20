"use strict";var onSuccess=function(){console.log("Success")},onError=function(){console.log("Error")};/* 
  TODO:
  This method should return an HTML element where a user can create a new blog post.
  You will call Utils.makeBlogPost(title, body, onSuccess, onError) to create the post in the database.
  Your element will be appended to the main element of the document.
  Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
*/function getNewPostContainer(){return Tests.testGetNewPostContainer()}main(Pages.POST);