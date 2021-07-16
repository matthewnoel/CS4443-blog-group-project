const firebaseConfig = {
  apiKey: "AIzaSyAs8iUPXAQgvT4VyvyEcynXT5ehziE5qwM",
  authDomain: "cs4443-blog-group-project.firebaseapp.com",
  projectId: "cs4443-blog-group-project",
  storageBucket: "cs4443-blog-group-project.appspot.com",
  messagingSenderId: "874490117378",
  appId: "1:874490117378:web:fe7ad8ef4c813840d2161b",
};

const handleAuthStateChange = function (user) {
  if (user) {
    Utils.renderAuthHeader(user);
    if (should_create_blog) {
      Utils.setBlogDocWithEmail();
    }
    if (should_render_profile) {
      Utils.postAuthInitProfile();
    }
  } else {
    BLOG_CREDENTIALS = {};
  }
};

let firestore = null;
let auth = null;
const main = function () {
  Utils.renderHeader();
  firebase.initializeApp(firebaseConfig);
  try {
    firestore = firebase.firestore();
  } catch (error) {
    console.log("Failed to load firestore script", error);
    return;
  }
  try {
    auth = firebase.auth();
  } catch (error) {
    console.log("Failed to load auth script", error);
    return;
  }
  Utils.renderAuthHeader();
  Utils.renderAuthOverLay();
  auth.onAuthStateChanged(handleAuthStateChange);
};
main();
