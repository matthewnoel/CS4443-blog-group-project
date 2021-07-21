const Globals = {};
const Pages = {
  BLOG: "blog",
  INDEX: "index",
  POST: "post",
  PROFILE: "profile",
  VIEW: "view",
};
const Tests = {};
const Utils = {};

let BLOG_CREDENTIALS = {};
let should_create_blog = false;
let should_render_profile = false;

Tests.testGetPostListContainer = function (blog_objs) {
  const container = document.createElement("div");
  container.className = "TEST-PAGE";
  if (blog_objs == null) {
    Utils.createAndAppendElements(
      {
        tag: "div",
        className: "TEST-CENTER-TEXT",
        child: {
          tag: "p",
          innerText: "Blog not found.",
        },
      },
      container
    );
    return container;
  }
  if (blog_objs.length === 0) {
    Utils.createAndAppendElements(
      {
        tag: "div",
        className: "TEST-CENTER-TEXT",
        child: {
          tag: "p",
          innerText: "This blog has no posts.",
        },
      },
      container
    );
    return container;
  }
  for (const blog_obj of blog_objs) {
    Utils.createAndAppendElements(
      {
        tag: "div",
        className: "TEST-CARD TEST-ROW",
        child: [
          {
            tag: "div",
            child: [
              {
                tag: "p",
                innerText: blog_obj.title,
                className: "TEST-BLOG-TITLE",
              },
              {
                tag: "p",
                innerText: Utils.truncateStr(blog_obj.body),
                className: "TEST-MEDIUM",
              },
            ],
          },
          {
            tag: "a",
            innerText: "Read",
            href: `/view.html?p=${blog_obj.id}`,
          },
        ],
      },
      container
    );
  }
  return container;
};

Tests.testGetBlogsListContainer = function (blog_objs) {
  const container = document.createElement("div");
  container.className = "TEST-PAGE";
  if (blog_objs.length === 0) {
    Utils.createAndAppendElements(
      {
        tag: "div",
        className: "TEST-CENTER-TEXT",
        child: {
          tag: "p",
          innerText:
            "No blogs have been created yet. Consider making an account!",
        },
      },
      container
    );
    return container;
  }
  for (const blog_obj of blog_objs) {
    Utils.createAndAppendElements(
      {
        tag: "div",
        className: "TEST-CARD TEST-ROW",
        child: [
          { tag: "p", innerText: blog_obj.name },
          {
            tag: "a",
            innerText: "Visit",
            href: `/blog.html?n=${blog_obj.name}`,
          },
        ],
      },
      container
    );
  }
  return container;
};

Tests.testGetPostManagerListContainer = function (post_objs) {
  const container = document.createElement("div");
  container.className = "TEST-PAGE TEST-CENTER-TEXT";
  if (post_objs == null) {
    Utils.createAndAppendElements(
      {
        tag: "p",
        innerText: "You must be logged in to view your profile.",
      },
      container
    );
    return container;
  }

  if (post_objs.length === 0) {
    Utils.createAndAppendElements(
      {
        tag: "p",
        innerText: "You do not have any posts yet.",
      },
      container
    );
    return container;
  }

  for (const post_obj of post_objs) {
    Utils.createAndAppendElements(
      {
        tag: "div",
        id: post_obj.id,
        className: "TEST-CARD TEST-ROW",
        child: [
          {
            tag: "div",
            child: [
              {
                tag: "p",
                innerText: post_obj.title,
                className: "TEST-PROFILE-TITLE",
              },
              {
                tag: "p",
                innerText: Utils.truncateStr(post_obj.body),
                className: "TEST-PROFILE-BODY",
              },
            ],
          },
          {
            tag: "button",
            id: `button_${post_obj.id}`,
            className: "TEST-BUTTON",
            innerText: "Delete",
            addEventListener: {
              type: "click",
              listener: (event) =>
                Utils.deleteBlogPost(
                  post_obj.id,
                  () => {
                    const child = document.getElementById(post_obj.id);
                    child.parentElement.removeChild(child);
                  },
                  (message) => {
                    console.log("Failed to delete post.", message);
                    document.getElementById(`button_${post_obj.id}`).innerText =
                      "Err. Try Again";
                  }
                ),
            },
          },
        ],
      },
      container
    );
  }

  return container;
};

Tests.testGetPostContainer = function (post_obj) {
  const container = document.createElement("div");
  container.className = "TEST-PAGE";
  if (post_obj == null) {
    Utils.createAndAppendElements(
      {
        tag: "div",
        className: "TEST-CENTER-TEXT",
        child: {
          tag: "p",
          className: "TEST-MEDIUM",
          innerText: "This post does not exits.",
        },
      },
      container
    );
    return container;
  }

  Utils.createAndAppendElements(
    {
      tag: "div",
      child: [
        {
          tag: "p",
          innerText: post_obj.title,
          className: "TEST-LARGE",
        },
        {
          tag: "p",
          innerText: `Author: ${post_obj.name}`,
          className: "TEST-SMALL",
          id: "TEST-VIEW-AUTHOR",
        },
        {
          tag: "p",
          innerText: Utils.truncateStr(post_obj.body),
          className: "TEST-MEDIUM",
        },
      ],
    },
    container
  );
  return container;
};

Tests.testGetNewPostContainer = function () {
  const container = document.createElement("div");
  container.className = "TEST-PAGE";
  const input_id = "TEST-NEW-POST-TITLE-ID";
  const textarea_id = "TEST-NEW-POST-TEXTAREA-ID";
  const message_id = "TEST-NEW-POST-MESSAGE-ID";
  Utils.createAndAppendElements(
    [
      {
        tag: "input",
        type: "text",
        id: input_id,
        placeholder: "Post Title",
        className: "TEST-FORM",
      },
      {
        tag: "textarea",
        id: textarea_id,
        placeholder: "Body",
        className: "TEST-FORM",
      },
      {
        type: "div",
        id: "TEST-NEW-POST-BOTTOM-TRAY",
        child: [
          {
            type: "p",
            innerText: "",
            id: message_id,
          },
          {
            tag: "button",
            className: "TEST-BUTTON POINTER",
            innerText: "Post",
            addEventListener: {
              type: "click",
              listener: () => {
                const title = document.getElementById(input_id).value;
                const body = document.getElementById(textarea_id).value;
                if (!title || !body) {
                  document.getElementById(message_id).innerText =
                    "Error: You must have a title and body to post.";
                  return;
                }
                Utils.makeBlogPost(
                  title,
                  body,
                  () => {
                    document.getElementById(message_id).innerText =
                      "Success! Your post has been made.";
                    document.getElementById(input_id).value = "";
                    document.getElementById(textarea_id).value = "";
                  },
                  (message) =>
                    (document.getElementById(
                      message_id
                    ).innerText = `Error: ${message}`)
                );
              },
            },
          },
        ],
      },
    ],
    container
  );
  return container;
};

Utils.truncateStr = function (str) {
  const max_length = 25;
  if (str == null) {
    return "...";
  }
  if (str.length > max_length) {
    return `${str.slice(0, max_length)}...`;
  }
  return str;
};

Utils.getSrcPath = function (page) {
  return `src/${page}.js`;
};

Utils.safeAssign = function (target, source) {
  const s = Object.assign({}, source);
  delete s.tag;
  delete s.child;
  if (s.hasOwnProperty("addEventListener")) {
    target.addEventListener(
      s.addEventListener.type,
      s.addEventListener.listener
    );
    delete s.addEventListener;
  }
  return Object.assign(target, s);
};

Utils.createAndAppendElements = function (child_obj, parent_el) {
  if (!child_obj.hasOwnProperty("child")) {
    if (Array.isArray(child_obj)) {
      for (const child of child_obj) {
        const child_el = document.createElement(child.tag);
        Utils.safeAssign(child_el, child);
        if (child.hasOwnProperty("child")) {
          Utils.createAndAppendElements(child.child, child_el);
        }
        parent_el.appendChild(child_el);
      }
    } else {
      const child_el = document.createElement(child_obj.tag);
      Utils.safeAssign(child_el, child_obj);
      parent_el.appendChild(child_el);
    }
    return;
  }

  if (Array.isArray(child_obj.child)) {
    const middle_el = document.createElement(child_obj.tag);
    Utils.safeAssign(middle_el, child_obj);
    for (const child of child_obj.child) {
      const child_el = document.createElement(child.tag);
      Utils.safeAssign(child_el, child);
      if (child.hasOwnProperty("child")) {
        Utils.createAndAppendElements(child.child, child_el);
      }
      middle_el.appendChild(child_el);
    }
    parent_el.appendChild(middle_el);
  } else {
    const child_el = document.createElement(child_obj.tag);
    Utils.safeAssign(child_el, child_obj);
    Utils.createAndAppendElements(child_obj.child, child_el);
    parent_el.appendChild(child_el);
  }
};

// https://davidwalsh.name/query-string-javascript
Utils.getUrlParam = function (name) {
  var newName = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + newName + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

Utils.getBlogNameFromEmail = function (email) {
  const name = email.replaceAll("@", "-");
  return name;
};

Utils.setBlogDocWithEmail = function () {
  const email = BLOG_CREDENTIALS.email;
  const uid = BLOG_CREDENTIALS.uid;
  if (!email || !uid) {
    console.log("Missing blog credentials for create call");
    return;
  }
  const name = Utils.getBlogNameFromEmail(email);
  DB()
    .collection("blogs")
    .doc(uid)
    .set({
      uid,
      name,
    })
    .then(() => {
      should_create_blog = false;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

Utils.makeBlogPost = function (title, body, onSuccess, onError) {
  if (!title || !body) {
    onError("cannot make blog post without title and body");
    return;
  }
  const user = AUTH().currentUser;
  if (user == null) {
    onError("cannot make blog post for user who is not logged in");
    return;
  }
  const name = Utils.getBlogNameFromEmail(user.email);
  const uid = user.uid;
  DB()
    .collection("posts")
    .doc()
    .set({
      title,
      body,
      name,
      uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      onSuccess();
    })
    .catch((error) => {
      onError(error);
    });
};

Utils.deleteBlogPost = function (id, onSuccess, onError) {
  DB()
    .collection("posts")
    .doc(id)
    .delete()
    .then(() => {
      onSuccess();
    })
    .catch((error) => {
      onError(error);
    });
};

Globals.renderAuthHeader = function (user = null) {
  const auth_el = document.getElementById("AUTH-ID");
  let text = "";
  if (user == null && AUTH().currentUser == null) {
    text = "Sign In";
    auth_el.removeEventListener("click", Globals.onHeaderSignOut);
    auth_el.addEventListener("click", Globals.onHeaderSignIn);
  } else {
    text = "Sign Out";
    auth_el.removeEventListener("click", Globals.onHeaderSignIn);
    auth_el.addEventListener("click", Globals.onHeaderSignOut);
  }
  auth_el.innerText = text;
};

Globals.renderHeader = function () {
  const header = document.getElementById("HEADER-ID");
  Utils.createAndAppendElements(
    [
      {
        tag: "a",
        href: "/",
        child: {
          tag: "img",
          src: "base/logo.png",
          id: "LOGO",
          alt: "CS4443 Blog Giraffe Logo",
        },
      },
      {
        tag: "nav",
        id: "NAV-ID",
        child: [
          {
            tag: "a",
            innerText: "Home",
            href: "/",
          },
          {
            tag: "a",
            innerText: "New Post",
            href: "/post.html",
          },
          {
            tag: "a",
            innerText: "Profile",
            href: "/profile.html",
          },
        ],
      },
      {
        tag: "div",
        child: {
          tag: "span",
          id: "AUTH-ID",
          innerText: "",
          className: "POINTER",
        },
      },
    ],
    header
  );
};

Globals.onHeaderSignIn = function () {
  const auth_bg = document.getElementById("AUTH-BG");
  auth_bg.className = "AUTH-BG-SHOW";
};

Globals.onHeaderSignOut = function () {
  AUTH()
    .signOut()
    .then(() => {
      const auth_el = document.getElementById("AUTH-ID");
      auth_el.removeEventListener("click", Globals.onHeaderSignOut);
      auth_el.addEventListener("click", Globals.onHeaderSignIn);
      auth_el.innerText = "Sign In";
    })
    .catch((error) => {
      // An error happened.
    });
};

Globals.handleAuthFormError = function (error) {
  let text = "Error. Try again.";
  if (error != null && error.message) {
    text = `Error: ${error.message}`;
  }
  document.getElementById("AUTH-FORM-ERR-ID").innerText = text;
  document.getElementById("EMAIL-ID").value = "";
  document.getElementById("PASS-ID").value = "";
  document.getElementById("CREATE-ACCOUNT-ID").disabled = false;
  document.getElementById("SIGN-IN-ID").disabled = false;
};

Globals.onFormCreateAccount = function (event) {
  document.getElementById("CREATE-ACCOUNT-ID").disabled = true;
  document.getElementById("SIGN-IN-ID").disabled = true;
  const email = document.getElementById("EMAIL-ID").value;
  const password = document.getElementById("PASS-ID").value;

  AUTH()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("AUTH-BG").className = "AUTH-BG-NO-SHOW";
      BLOG_CREDENTIALS = Object.assign(
        {},
        { uid: userCredential.user.uid, email }
      );
      should_create_blog = true;
    })
    .catch((error) => Globals.handleAuthFormError(error));
};

Globals.onFormSignIn = function (event) {
  document.getElementById("CREATE-ACCOUNT-ID").disabled = true;
  document.getElementById("SIGN-IN-ID").disabled = true;
  const email = document.getElementById("EMAIL-ID").value;
  const password = document.getElementById("PASS-ID").value;

  AUTH()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("AUTH-BG").className = "AUTH-BG-NO-SHOW";
      BLOG_CREDENTIALS = Object.assign(
        {},
        { uid: userCredential.user.uid, email }
      );
      should_create_blog = true;
    })
    .catch((error) => Globals.handleAuthFormError(error));
};

Globals.renderAuthOverLay = function () {
  const body_el = document.getElementsByTagName("body")[0];
  Utils.createAndAppendElements(
    {
      tag: "div",
      id: "AUTH-BG",
      className: "AUTH-BG-NO-SHOW",
      child: {
        tag: "div",
        id: "AUTH-FORM-BG",
        child: [
          {
            tag: "p",
            innerText: "Welcome",
            className: "TEST-LARGE",
          },
          {
            tag: "input",
            type: "text",
            placeholder: "Email",
            id: "EMAIL-ID",
            className: "TEST-FORM",
          },
          {
            tag: "input",
            type: "password",
            placeholder: "Password",
            id: "PASS-ID",
            className: "TEST-FORM",
          },
          {
            tag: "button",
            innerText: "Create Account",
            id: "CREATE-ACCOUNT-ID",
            className: "TEST-BUTTON",
            addEventListener: {
              type: "click",
              listener: Globals.onFormCreateAccount,
            },
          },
          {
            tag: "button",
            innerText: "Sign In",
            id: "SIGN-IN-ID",
            className: "TEST-BUTTON",
            addEventListener: {
              type: "click",
              listener: Globals.onFormSignIn,
            },
          },
          {
            type: "p",
            id: "AUTH-FORM-ERR-ID",
          },
        ],
      },
    },
    body_el
  );
};

Globals.showErrOverlay = function () {
  document.getElementById("ERR-BG").className = "ERR-BG-SHOW";
};

Globals.renderErrOverlay = function () {
  const body_el = document.getElementsByTagName("body")[0];
  Utils.createAndAppendElements(
    {
      tag: "div",
      id: "ERR-BG",
      className: "ERR-BG-NO-SHOW",
      child: {
        tag: "div",
        id: "ERR-FORM-BG",
        child: [
          {
            tag: "p",
            innerText: "A fatal error has occured.",
          },
          {
            tag: "button",
            innerText: "Retry",
            addEventListener: {
              type: "click",
              listener: () => window.location.reload(),
            },
          },
        ],
      },
    },
    body_el
  );
};

Globals.renderUnimplemented = function (file_location) {
  const main_el = document.getElementById("MAIN-ID");
  main_el.innerHTML = "";
  Utils.createAndAppendElements(
    {
      tag: "div",
      className: "DNE-CONTAINER",
      child: [
        {
          tag: "p",
          innerText:
            "This section has not been implemented yet. If you are a group member, you can do so in",
        },
        {
          tag: "p",
          innerText: file_location,
        },
      ],
    },
    main_el
  );
};

Globals.handleChild = function (child_el, file_location) {
  if (child_el == null) {
    Globals.renderUnimplemented(file_location);
  } else {
    const main_el = document.getElementById("MAIN-ID");
    main_el.innerHTML = "";
    main_el.appendChild(child_el);
  }
};

Globals.initIndex = function () {
  const blog_objs = [];
  DB()
    .collection("blogs")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        blog_objs.push(doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting blogs", error);
    })
    .finally(() =>
      Globals.handleChild(
        getBlogsListContainer(blog_objs),
        Utils.getSrcPath(Pages.INDEX)
      )
    );
};

Globals.initBlog = function () {
  const blog_name = Utils.getUrlParam("n");
  if (!blog_name) {
    Globals.handleChild(
      getPostListContainer(null),
      Utils.getSrcPath(Pages.BLOG)
    );
    return;
  }
  const post_objs = [];
  DB()
    .collection("posts")
    .where("name", "==", blog_name)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        post_objs.push(data);
      });
    })
    .catch((error) => {
      console.log("Error getting blog posts", error);
    })
    .finally(() =>
      Globals.handleChild(
        getPostListContainer(
          post_objs.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate())
        ),
        Utils.getSrcPath(Pages.BLOG)
      )
    );
};

Globals.initPost = function () {
  Globals.handleChild(getNewPostContainer(), Utils.getSrcPath(Pages.POST));
};

Globals.initView = function () {
  const post_id = Utils.getUrlParam("p");
  if (!post_id) {
    Globals.handleChild(getPostContainer(null), Utils.getSrcPath(Pages.VIEW));
    return;
  }
  DB()
    .collection("posts")
    .doc(post_id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        Globals.handleChild(
          getPostContainer(doc.data()),
          Utils.getSrcPath(Pages.VIEW)
        );
      } else {
        Globals.handleChild(
          getPostContainer(null),
          Utils.getSrcPath(Pages.VIEW)
        );
      }
    })
    .catch((error) => {
      console.log("Error post", error);
    });
};

Utils.postAuthInitProfile = function () {
  should_render_profile = false;
  const current_user = AUTH().currentUser;
  if (current_user == null) {
    Globals.handleChild(
      getPostManagerListContainer(null),
      Utils.getSrcPath(Pages.PROFILE)
    );
    return;
  }
  const blog_name = Utils.getBlogNameFromEmail(current_user.email);
  const post_objs = [];
  DB()
    .collection("posts")
    .where("name", "==", blog_name)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        post_objs.push(data);
      });
    })
    .catch((error) => {
      console.log("Error blog posts for profile", error);
    })
    .finally(() => {
      Globals.handleChild(
        getPostManagerListContainer(
          post_objs.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate())
        ),
        Utils.getSrcPath(Pages.PROFILE)
      );
    });
};

Globals.initProfile = function () {
  should_render_profile = true;
  Utils.postAuthInitProfile();
};

Globals.initQuery = function (location) {
  switch (location) {
    case "index":
      Globals.initIndex();
      break;
    case "blog":
      Globals.initBlog();
      break;
    case "post":
      Globals.initPost();
      break;
    case "view":
      Globals.initView();
      break;
    case "profile":
      Globals.initProfile();
      break;
    default:
      console.log(`Unkown initQuery argument ${location}`);
      break;
  }
};

function AUTH() {
  let auth = null;
  try {
    auth = firebase.auth();
  } catch (error) {
    console.log("Failed to load auth script", error);
    Globals.showErrOverlay();
  }
  return auth;
}

function DB() {
  let firestore = null;
  try {
    firestore = firebase.firestore();
  } catch (error) {
    console.log("Failed to load firestore script", error);
    Globals.showErrOverlay();
  }
  return firestore;
}

function init() {
  Globals.renderHeader();
  Globals.renderAuthOverLay();
  Globals.renderErrOverlay();
}

function main(page) {
  try {
    firebase.initializeApp({
      apiKey: "AIzaSyAs8iUPXAQgvT4VyvyEcynXT5ehziE5qwM",
      authDomain: "cs4443-blog-group-project.firebaseapp.com",
      projectId: "cs4443-blog-group-project",
      storageBucket: "cs4443-blog-group-project.appspot.com",
      messagingSenderId: "874490117378",
      appId: "1:874490117378:web:fe7ad8ef4c813840d2161b",
    });
  } catch (error) {
    Globals.showErrOverlay();
  }
  if (AUTH() == null || DB() == null) {
    return;
  }
  Globals.renderAuthHeader(AUTH().currentUser);
  AUTH().onAuthStateChanged((user) => {
    if (page === Pages.PROFILE) {
      Utils.postAuthInitProfile();
    }
    if (user) {
      Globals.renderAuthHeader(user);
      if (should_create_blog) {
        Utils.setBlogDocWithEmail();
      }
    } else {
      BLOG_CREDENTIALS = {};
    }
  });
  Globals.initQuery(page);
}
