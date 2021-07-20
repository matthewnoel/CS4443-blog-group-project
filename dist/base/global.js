"use strict";function _createForOfIteratorHelper(a,b){var c="undefined"!=typeof Symbol&&a[Symbol.iterator]||a["@@iterator"];if(!c){if(Array.isArray(a)||(c=_unsupportedIterableToArray(a))||b&&a&&"number"==typeof a.length){c&&(a=c);var d=0,e=function(){};return{s:e,n:function n(){return d>=a.length?{done:!0}:{done:!1,value:a[d++]}},e:function e(a){throw a},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var f,g=!0,h=!1;return{s:function s(){c=c.call(a)},n:function n(){var a=c.next();return g=a.done,a},e:function e(a){h=!0,f=a},f:function f(){try{g||null==c["return"]||c["return"]()}finally{if(h)throw f}}}}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}var Globals={},Pages={BLOG:"blog",INDEX:"index",POST:"post",PROFILE:"profile",VIEW:"view"},Tests={},Utils={},BLOG_CREDENTIALS={},should_create_blog=!1,should_render_profile=!1;Tests.testGetPostListContainer=function(a){var b=document.createElement("div");if(null==a)return Utils.createAndAppendElements({tag:"p",innerText:"Blog not found."},b),b;if(0===a.length)return Utils.createAndAppendElements({tag:"p",innerText:"This blog has no posts."},b),b;var c,d=_createForOfIteratorHelper(a);try{for(d.s();!(c=d.n()).done;){var e=c.value;Utils.createAndAppendElements({tag:"div",className:"CARD",child:[{tag:"p",innerText:e.title},{tag:"p",innerText:Utils.truncateStr(e.body)},{tag:"a",innerText:"Read",href:"/view.html?p=".concat(e.id)}]},b)}}catch(a){d.e(a)}finally{d.f()}return b},Tests.testGetBlogsListContainer=function(a){var b=document.createElement("div");if(0===a.length)return Utils.createAndAppendElements({tag:"p",innerText:"No blogs have been created yet. Consider making an account!"},b),b;var c,d=_createForOfIteratorHelper(a);try{for(d.s();!(c=d.n()).done;){var e=c.value;Utils.createAndAppendElements({tag:"div",className:"CARD",child:[{tag:"p",innerText:e.name},{tag:"a",innerText:"Visit",href:"/blog.html?n=".concat(e.name)}]},b)}}catch(a){d.e(a)}finally{d.f()}return b},Tests.testGetPostManagerListContainer=function(a){var b=document.createElement("div");if(null==a)return Utils.createAndAppendElements({tag:"p",innerText:"You must be logged in to view your profile."},b),b;if(0===a.length)return Utils.createAndAppendElements({tag:"p",innerText:"You do not have any posts yet."},b),b;var c,d=_createForOfIteratorHelper(a);try{var e=function(){var a=c.value;Utils.createAndAppendElements({tag:"div",id:a.id,className:"CARD",child:[{tag:"p",innerText:a.title},{tag:"p",innerText:Utils.truncateStr(a.body)},{tag:"button",id:"button_".concat(a.id),innerText:"Delete",addEventListener:{type:"click",listener:function listener(){return Utils.deleteBlogPost(a.id,function(){var b=document.getElementById(a.id);b.parentElement.removeChild(b)},function(b){console.log("Failed to delete post.",b),document.getElementById("button_".concat(a.id)).innerText="Err. Try Again"})}}}]},b)};for(d.s();!(c=d.n()).done;)e()}catch(a){d.e(a)}finally{d.f()}return b},Tests.testGetPostContainer=function(a){var b=document.createElement("div");return null==a?(Utils.createAndAppendElements({tag:"p",innerText:"This post does not exits."},b),b):(Utils.createAndAppendElements({tag:"div",child:[{tag:"p",innerText:a.title},{tag:"p",innerText:"Author: ".concat(a.name)},{tag:"p",innerText:Utils.truncateStr(a.body)}]},b),b)},Tests.testGetNewPostContainer=function(){var a=document.createElement("div"),b="TEST-NEW-POST-TITLE-ID",c="TEST-NEW-POST-TEXTAREA-ID",d="TEST-NEW-POST-MESSAGE-ID";return Utils.createAndAppendElements([{tag:"input",type:"text",id:b,placeholder:"Post Title"},{tag:"textarea",id:c,placeholder:"Body"},{type:"div",id:"TEST-NEW-POST-BOTTOM-TRAY",child:[{type:"p",innerText:"",id:d},{tag:"button",innerText:"Post",addEventListener:{type:"click",listener:function listener(){var a=document.getElementById(b).value,e=document.getElementById(c).value;return a&&e?void Utils.makeBlogPost(a,e,function(){document.getElementById(d).innerText="Success! Your post has been made.",document.getElementById(b).value="",document.getElementById(c).value=""},function(a){return document.getElementById(d).innerText="Error: ".concat(a)}):void(document.getElementById(d).innerText="Error: You must have a title and body to post.")}}}]}],a),a},Utils.truncateStr=function(a){return null==a?"...":25<a.length?"".concat(a.slice(0,25),"..."):a},Utils.getSrcPath=function(a){return"src/".concat(a,".js")},Utils.safeAssign=function(a,b){var c=Object.assign({},b);return delete c.tag,delete c.child,c.hasOwnProperty("addEventListener")&&(a.addEventListener(c.addEventListener.type,c.addEventListener.listener),delete c.addEventListener),Object.assign(a,c)},Utils.createAndAppendElements=function(a,b){if(!a.hasOwnProperty("child")){if(Array.isArray(a)){var c,d=_createForOfIteratorHelper(a);try{for(d.s();!(c=d.n()).done;){var e=c.value,f=document.createElement(e.tag);Utils.safeAssign(f,e),e.hasOwnProperty("child")&&Utils.createAndAppendElements(e.child,f),b.appendChild(f)}}catch(a){d.e(a)}finally{d.f()}}else{var k=document.createElement(a.tag);Utils.safeAssign(k,a),b.appendChild(k)}return}if(Array.isArray(a.child)){var l=document.createElement(a.tag);Utils.safeAssign(l,a);var g,h=_createForOfIteratorHelper(a.child);try{for(h.s();!(g=h.n()).done;){var i=g.value,j=document.createElement(i.tag);Utils.safeAssign(j,i),i.hasOwnProperty("child")&&Utils.createAndAppendElements(i.child,j),l.appendChild(j)}}catch(a){h.e(a)}finally{h.f()}b.appendChild(l)}else{var m=document.createElement(a.tag);Utils.safeAssign(m,a),Utils.createAndAppendElements(a.child,m),b.appendChild(m)}},Utils.getUrlParam=function(a){var b=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]"),c=new RegExp("[\\?&]"+b+"=([^&#]*)"),d=c.exec(location.search);return null===d?"":decodeURIComponent(d[1].replace(/\+/g," "))},Utils.getBlogNameFromEmail=function(a){var b=a.replaceAll("@","-");return b},Utils.setBlogDocWithEmail=function(){var a=BLOG_CREDENTIALS.email,b=BLOG_CREDENTIALS.uid;if(!a||!b)return void console.log("Missing blog credentials for create call");var c=Utils.getBlogNameFromEmail(a);DB().collection("blogs").doc(b).set({uid:b,name:c}).then(function(){should_create_blog=!1})["catch"](function(a){console.error("Error writing document: ",a)})},Utils.makeBlogPost=function(a,b,c,d){if(!a||!b)return void d("cannot make blog post without title and body");var e=AUTH().currentUser;if(null==e)return void d("cannot make blog post for user who is not logged in");var f=Utils.getBlogNameFromEmail(e.email),g=e.uid;DB().collection("posts").doc().set({title:a,body:b,name:f,uid:g,timestamp:firebase.firestore.FieldValue.serverTimestamp()}).then(function(){c()})["catch"](function(a){d(a)})},Utils.deleteBlogPost=function(a,b,c){DB().collection("posts").doc(a)["delete"]().then(function(){b()})["catch"](function(a){c(a)})},Globals.renderAuthHeader=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:null,b=document.getElementById("AUTH-ID"),c="";null==a&&null==AUTH().currentUser?(c="Sign In",b.removeEventListener("click",Globals.onHeaderSignOut),b.addEventListener("click",Globals.onHeaderSignIn)):(c="Sign Out",b.removeEventListener("click",Globals.onHeaderSignIn),b.addEventListener("click",Globals.onHeaderSignOut)),b.innerText=c},Globals.renderHeader=function(){var a=document.getElementById("HEADER-ID");Utils.createAndAppendElements([{tag:"span",innerText:"Blog Site"},{tag:"nav",id:"NAV-ID",child:[{tag:"a",innerText:"Home",href:"/"},{tag:"a",innerText:"New Post",href:"/post.html"},{tag:"a",innerText:"Profile",href:"/profile.html"}]},{tag:"div",child:{tag:"span",id:"AUTH-ID",innerText:""}}],a)},Globals.onHeaderSignIn=function(){var a=document.getElementById("AUTH-BG");a.className="AUTH-BG-SHOW"},Globals.onHeaderSignOut=function(){AUTH().signOut().then(function(){var a=document.getElementById("AUTH-ID");a.removeEventListener("click",Globals.onHeaderSignOut),a.addEventListener("click",Globals.onHeaderSignIn),a.innerText="Sign In"})["catch"](function(){// An error happened.
})},Globals.handleAuthFormError=function(a){var b="Error. Try again.";null!=a&&a.message&&(b="Error: ".concat(a.message)),document.getElementById("AUTH-FORM-ERR-ID").innerText=b,document.getElementById("EMAIL-ID").value="",document.getElementById("PASS-ID").value="",document.getElementById("CREATE-ACCOUNT-ID").disabled=!1,document.getElementById("SIGN-IN-ID").disabled=!1},Globals.onFormCreateAccount=function(){document.getElementById("CREATE-ACCOUNT-ID").disabled=!0,document.getElementById("SIGN-IN-ID").disabled=!0;var a=document.getElementById("EMAIL-ID").value,b=document.getElementById("PASS-ID").value;AUTH().createUserWithEmailAndPassword(a,b).then(function(b){document.getElementById("AUTH-BG").className="AUTH-BG-NO-SHOW",BLOG_CREDENTIALS=Object.assign({},{uid:b.user.uid,email:a}),should_create_blog=!0})["catch"](function(a){return Globals.handleAuthFormError(a)})},Globals.onFormSignIn=function(){document.getElementById("CREATE-ACCOUNT-ID").disabled=!0,document.getElementById("SIGN-IN-ID").disabled=!0;var a=document.getElementById("EMAIL-ID").value,b=document.getElementById("PASS-ID").value;AUTH().signInWithEmailAndPassword(a,b).then(function(b){document.getElementById("AUTH-BG").className="AUTH-BG-NO-SHOW",BLOG_CREDENTIALS=Object.assign({},{uid:b.user.uid,email:a}),should_create_blog=!0})["catch"](function(a){return Globals.handleAuthFormError(a)})},Globals.renderAuthOverLay=function(){var a=document.getElementsByTagName("body")[0];Utils.createAndAppendElements({tag:"div",id:"AUTH-BG",className:"AUTH-BG-NO-SHOW",child:{tag:"div",id:"AUTH-FORM-BG",child:[{tag:"p",innerText:"Welcome"},{tag:"input",type:"text",id:"EMAIL-ID"},{tag:"input",type:"password",id:"PASS-ID"},{tag:"button",innerText:"Create Account",id:"CREATE-ACCOUNT-ID",addEventListener:{type:"click",listener:Globals.onFormCreateAccount}},{tag:"button",innerText:"Sign In",id:"SIGN-IN-ID",addEventListener:{type:"click",listener:Globals.onFormSignIn}},{type:"p",id:"AUTH-FORM-ERR-ID"}]}},a)},Globals.showErrOverlay=function(){document.getElementById("ERR-BG").className="ERR-BG-SHOW"},Globals.renderErrOverlay=function(){var a=document.getElementsByTagName("body")[0];Utils.createAndAppendElements({tag:"div",id:"ERR-BG",className:"ERR-BG-NO-SHOW",child:{tag:"div",id:"ERR-FORM-BG",child:[{tag:"p",innerText:"A fatal error has occured."},{tag:"button",innerText:"Retry",addEventListener:{type:"click",listener:function listener(){return window.location.reload()}}}]}},a)},Globals.renderUnimplemented=function(a){var b=document.getElementById("MAIN-ID");b.innerHTML="",Utils.createAndAppendElements({tag:"div",className:"DNE-CONTAINER",child:[{tag:"p",innerText:"This section has not been implemented yet. If you are a group member, you can do so in"},{tag:"p",innerText:a}]},b)},Globals.handleChild=function(a,b){if(null==a)Globals.renderUnimplemented(b);else{var c=document.getElementById("MAIN-ID");c.innerHTML="",c.appendChild(a)}},Globals.initIndex=function(){var a=[];DB().collection("blogs").get().then(function(b){b.forEach(function(b){a.push(b.data())})})["catch"](function(a){console.log("Error getting blogs",a)})["finally"](function(){return Globals.handleChild(getBlogsListContainer(a),Utils.getSrcPath(Pages.INDEX))})},Globals.initBlog=function(){var a=Utils.getUrlParam("n");if(!a)return void Globals.handleChild(getPostListContainer(null),Utils.getSrcPath(Pages.BLOG));var b=[];DB().collection("posts").where("name","==",a).get().then(function(a){a.forEach(function(a){var c=a.data();c.id=a.id,b.push(c)})})["catch"](function(a){console.log("Error getting blog posts",a)})["finally"](function(){return Globals.handleChild(getPostListContainer(b.sort(function(c,a){return a.timestamp.toDate()-c.timestamp.toDate()})),Utils.getSrcPath(Pages.BLOG))})},Globals.initPost=function(){Globals.handleChild(getNewPostContainer(),Utils.getSrcPath(Pages.POST))},Globals.initView=function(){var a=Utils.getUrlParam("p");return a?void DB().collection("posts").doc(a).get().then(function(a){a.exists?Globals.handleChild(getPostContainer(a.data()),Utils.getSrcPath(Pages.VIEW)):Globals.handleChild(getPostContainer(null),Utils.getSrcPath(Pages.VIEW))})["catch"](function(a){console.log("Error post",a)}):void Globals.handleChild(getPostContainer(null),Utils.getSrcPath(Pages.VIEW))},Utils.postAuthInitProfile=function(){should_render_profile=!1;var a=AUTH().currentUser;if(null==a)return void Globals.handleChild(getPostManagerListContainer(null),Utils.getSrcPath(Pages.PROFILE));var b=Utils.getBlogNameFromEmail(a.email),c=[];DB().collection("posts").where("name","==",b).get().then(function(a){a.forEach(function(a){var b=a.data();b.id=a.id,c.push(b)})})["catch"](function(a){console.log("Error blog posts for profile",a)})["finally"](function(){Globals.handleChild(getPostManagerListContainer(c.sort(function(c,a){return a.timestamp.toDate()-c.timestamp.toDate()})),Utils.getSrcPath(Pages.PROFILE))})},Globals.initProfile=function(){should_render_profile=!0,Utils.postAuthInitProfile()},Globals.initQuery=function(a){switch(a){case"index":Globals.initIndex();break;case"blog":Globals.initBlog();break;case"post":Globals.initPost();break;case"view":Globals.initView();break;case"profile":Globals.initProfile();break;default:console.log("Unkown initQuery argument ".concat(a));}};function AUTH(){var a=null;try{a=firebase.auth()}catch(a){console.log("Failed to load auth script",a),Globals.showErrOverlay()}return a}function DB(){var a=null;try{a=firebase.firestore()}catch(a){console.log("Failed to load firestore script",a),Globals.showErrOverlay()}return a}function init(){Globals.renderHeader(),Globals.renderAuthOverLay(),Globals.renderErrOverlay()}function main(a){try{firebase.initializeApp({apiKey:"AIzaSyAs8iUPXAQgvT4VyvyEcynXT5ehziE5qwM",authDomain:"cs4443-blog-group-project.firebaseapp.com",projectId:"cs4443-blog-group-project",storageBucket:"cs4443-blog-group-project.appspot.com",messagingSenderId:"874490117378",appId:"1:874490117378:web:fe7ad8ef4c813840d2161b"})}catch(a){Globals.showErrOverlay()}null==AUTH()||null==DB()||(Globals.renderAuthHeader(AUTH().currentUser),AUTH().onAuthStateChanged(function(b){a===Pages.PROFILE&&Utils.postAuthInitProfile(),b?(Globals.renderAuthHeader(b),should_create_blog&&Utils.setBlogDocWithEmail()):BLOG_CREDENTIALS={}}),Globals.initQuery(a))}