const Utils = {};
const Tests = {};
const INDEX_FILE_LOCATION = "src/index.js";
const BLOG_FILE_LOCATION = "src/blog.js";
const PROFILE_FILE_LOCATION = "src/profile.js";
const POST_FILE_LOCATION = "src/post.js";
const VIEW_FILE_LOCATION = "src/view.js";
let BLOG_CREDENTIALS = {};
let should_create_blog = false;
let should_render_profile = false;

Tests.testGetNewPostContainer = function () {
  const p_el = document.createElement("p");
  p_el.innerText = "Make Post";
  p_el.addEventListener("click", () => {
    Utils.makeBlogPost(
      "Test title",
      "Test body of post.",
      () => console.log("Success"),
      (message) => console.log(message)
    );
  });
  return p_el;
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

Utils.renderHeader = function () {
  const header = document.getElementById("HEADER-ID");
  Utils.createAndAppendElements(
    [
      {
        tag: "span",
        innerText: "Blog Site",
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
        },
      },
    ],
    header
  );
};

Utils.onHeaderSignIn = function () {
  const auth_bg = document.getElementById("AUTH-BG");
  auth_bg.className = "AUTH-BG-SHOW";
};

Utils.onHeaderSignOut = function () {
  auth
    .signOut()
    .then(() => {
      const auth_el = document.getElementById("AUTH-ID");
      auth_el.removeEventListener("click", Utils.onHeaderSignOut);
      auth_el.addEventListener("click", Utils.onHeaderSignIn);
      auth_el.innerText = "Sign In";
    })
    .catch((error) => {
      // An error happened.
    });
};

Utils.renderAuthHeader = function (user = null) {
  const auth_el = document.getElementById("AUTH-ID");
  let text = "";
  const current_user = user || auth.currentUser;
  if (current_user == null) {
    text = "Sign In";
    auth_el.removeEventListener("click", Utils.onHeaderSignOut);
    auth_el.addEventListener("click", Utils.onHeaderSignIn);
  } else {
    text = "Sign Out";
    auth_el.removeEventListener("click", Utils.onHeaderSignIn);
    auth_el.addEventListener("click", Utils.onHeaderSignOut);
  }
  auth_el.innerText = text;
};

Utils.handleAuthFormError = function (error) {
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

Utils.getBlogNameFromEmail = function (email) {
  let name = email.replaceAll(".", "-");
  const at = email.lastIndexOf("@");
  if (at !== -1) {
    name = name.slice(0, at);
  }
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
  firestore
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

Utils.onFormCreateAccount = function (event) {
  document.getElementById("CREATE-ACCOUNT-ID").disabled = true;
  document.getElementById("SIGN-IN-ID").disabled = true;
  const email = document.getElementById("EMAIL-ID").value;
  const password = document.getElementById("PASS-ID").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("AUTH-BG").className = "AUTH-BG-NO-SHOW";
      BLOG_CREDENTIALS = Object.assign(
        {},
        { uid: userCredential.user.uid, email }
      );
      should_create_blog = true;
    })
    .catch((error) => Utils.handleAuthFormError(error));
};

Utils.onFormSignIn = function (event) {
  document.getElementById("CREATE-ACCOUNT-ID").disabled = true;
  document.getElementById("SIGN-IN-ID").disabled = true;
  const email = document.getElementById("EMAIL-ID").value;
  const password = document.getElementById("PASS-ID").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("AUTH-BG").className = "AUTH-BG-NO-SHOW";
      BLOG_CREDENTIALS = Object.assign(
        {},
        { uid: userCredential.user.uid, email }
      );
      should_create_blog = true;
    })
    .catch((error) => Utils.handleAuthFormError(error));
};

Utils.renderAuthOverLay = function () {
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
          },
          {
            tag: "input",
            type: "text",
            id: "EMAIL-ID",
          },
          {
            tag: "input",
            type: "password",
            id: "PASS-ID",
          },
          {
            tag: "button",
            innerText: "Create Account",
            id: "CREATE-ACCOUNT-ID",
            addEventListener: {
              type: "click",
              listener: Utils.onFormCreateAccount,
            },
          },
          {
            tag: "button",
            innerText: "Sign In",
            id: "SIGN-IN-ID",
            addEventListener: {
              type: "click",
              listener: Utils.onFormSignIn,
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

Utils.renderUnimplemented = function (file_location) {
  const main_el = document.getElementById("MAIN-ID");
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

Utils.makeBlogPost = function (title, body, onSuccess, onError) {
  if (!title || !body) {
    onError("cannot make blog post without title and body");
    return;
  }
  const user = auth.currentUser;
  if (user == null) {
    onError("cannot make blog post for user who is not logged in");
    return;
  }
  const name = Utils.getBlogNameFromEmail(user.email);
  const uid = user.uid;
  firestore
    .collection("posts")
    .doc()
    .set({
      title,
      body,
      name,
      uid,
    })
    .then(() => {
      onSuccess();
    })
    .catch((error) => {
      onError(error);
    });
};

Utils.deleteBlogPost = function (id, onSuccess, onError) {
  firestore
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

Utils.handleChild = function (child_el, file_location) {
  if (child_el == null) {
    Utils.renderUnimplemented(file_location);
  } else {
    const main_el = document.getElementById("MAIN-ID");
    main_el.appendChild(child_el);
  }
};

Utils.initIndex = function () {
  const blog_objs = [];
  firestore
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
      Utils.handleChild(getBlogsListContainer(blog_objs), INDEX_FILE_LOCATION)
    );
};

Utils.initBlog = function () {
  const blog_name = Utils.getUrlParam("n");
  if (!blog_name) {
    Utils.handleChild(getPostListContainer(null), BLOG_FILE_LOCATION);
    return;
  }
  const blog_objs = [];
  firestore
    .collection("posts")
    .where("name", "==", blog_name)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        blog_objs.push(data);
      });
    })
    .catch((error) => {
      console.log("Error getting blog posts", error);
    })
    .finally(() =>
      Utils.handleChild(getPostListContainer(blog_objs), BLOG_FILE_LOCATION)
    );
};

Utils.initPost = function () {
  Utils.handleChild(getNewPostContainer(), POST_FILE_LOCATION);
};

Utils.initView = function () {
  const post_id = Utils.getUrlParam("p");
  if (!post_id) {
    Utils.handleChild(getPostContainer(null), VIEW_FILE_LOCATION);
    return;
  }
  firestore
    .collection("posts")
    .doc(post_id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        Utils.handleChild(getPostContainer(doc.data()), VIEW_FILE_LOCATION);
      } else {
        Utils.handleChild(getPostContainer(null), VIEW_FILE_LOCATION);
      }
    })
    .catch((error) => {
      console.log("Error post", error);
    });
};

Utils.postAuthInitProfile = function () {
  should_render_profile = false;
  const current_user = auth.currentUser;
  if (current_user == null) {
    Utils.handleChild(getPostManagerListContainer(null), PROFILE_FILE_LOCATION);
    return;
  }
  const blog_name = Utils.getBlogNameFromEmail(current_user.email);
  const post_objs = [];
  firestore
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
      Utils.handleChild(
        getPostManagerListContainer(post_objs),
        PROFILE_FILE_LOCATION
      );
    });
};

Utils.initProfile = function () {
  should_render_profile = true;
};

Utils.initQuery = function (location) {
  switch (location) {
    case "index":
      Utils.initIndex();
      break;
    case "blog":
      Utils.initBlog();
      break;
    case "post":
      Utils.initPost();
      break;
    case "view":
      Utils.initView();
      break;
    case "profile":
      Utils.initProfile();
      break;
    default:
      console.log(`Unkown initQuery argument ${location}`);
      break;
  }
};
