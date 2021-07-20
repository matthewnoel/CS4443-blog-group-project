# CS4443 Blog Group Project

Blogging website for class group project

Public URL: https://cs4443-blog-group-project.web.app/

## Overview

The project uses [firebase](https://firebase.google.com/) for a backend. Most of the logic including the auth flow is hidden in src/base/ for the convenience of other group members. Each html page has a corresponding javascript file which contains a currently unimplemented function. Each function also has a corresponding test function in `src/globals.js` which can be used as an example. The functions are listed below and the suggested completion order is:

1. src/post.js (So everyone can make posts)
2. src/indexjs (So a list of all blogs can be seen)
3. src/blog.js (So blogs can be viewed)
4. src/view.js (So posts can be viewed on their own)
5. src/profile.js (So posts can be deleted)

I've tested implementing each of these functions myself so I'm pretty sure everything should work, but message me if you run into anything unexpected. For starting data, I have registered a user account myself and my blog is in the database. I also have one post, which you will see when you begin to implement the unfinished funcitons.

## Things To Do

- [] Implement getPostListContainer in src/blog.js
- [] Implement getBlogsListContainer in src/index.js
- [] Implement getNewPostContainer in src/post.js
- [] Implement getPostManagerListContainer in src/profile.js
- [] Implement getPostContainer in src/view.js
