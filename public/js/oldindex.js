let userId = localStorage.getItem("user");

//============================== Functionality ========================//
let renderPostFeed = () => {
  getPosts().then(results => {
    renderPosts(results);
  });
};

// Global varibles.............
let post = $(".post");

// Calling render functions for comments page.............
let renderCommentPage = () => {
  getPostComments().then(res => {
    renderComments(res);
  });
};
let renderPost = id => {
  getSinglePost(id).then(res => {
    renderSinglePost(res);
  });
};

// Render Existing Posts ........................
let renderPosts = results => {
  console.log(results);
  post.empty().append($("<hr>"));
  results.forEach(result => {
    let cardbody = $("<div>").addClass("card-body");

    let row1 = $("<div>").addClass("row");
    let col1 = $("<div>").addClass("col-sm-4");
    let col2 = $("<div>").addClass("col-sm-8");

    let leftRow1 = $("<div>").addClass("row");
    let leftRow2 = $("<div>").addClass("row");
    let leftRow3 = $("<div>").addClass("row");

    let upVote = $("<button>")
      .addClass("voteBtn btn btn-primary ")
      .data("postId", result.id)
      .attr("value", "up")
      .text("upvote");
    let votes = $("<div>").text(result.Votes.length + "votes");
    let downVote = $("<button>")
      .addClass("voteBtn btn btn-primary ")
      .data("postId", result.id)
      .attr("value", "down")
      .text("downvote");

    // voteOnPost(results.id).then(function(data) {
    //   console.log(data);
    //   votes.text(data.length + " votes");
    // });

    leftRow1.append(upVote);
    leftRow2.append(votes);
    leftRow3.append(downVote);

    let rightRow1 = $("<div>").addClass("row");
    let rightRow2 = $("<div>").addClass("row");
    let rightRow3 = $("<div>").addClass("row");

    let posterInfo = $("<div>").html(
      "Posted in <a class = subLink id = " +
        result.Sub.id +
        " href='/subs'>" +
        result.Sub.title +
        "</a> by " +
        result.User.user_name +
        " at " +
        result.createdAt
    );
    rightRow1.append(posterInfo);

    // let posterInfo = $("<div>").html(
    //   "Posted in <a class = subLink id = " +
    //     result.Sub.id +
    //     " href='/subs'>" +
    //     result.Sub.title +
    //     "</a> by " +
    //     result.User.user_name +
    //     " at " +
    //     result.createdAt
    // );

    let title = $("<h5>")
      .addClass("mb-0")
      .text(result.title);

    let body = $("<p>")
      .addClass("card-text")
      .text(result.body);

    rightRow2.append(title, body);

    let btn = $("<a href='/comments'>")
      .addClass("comment link secondary")
      .data("id", result.id)
      .text(result.Comments.length + " Comments");

    rightRow3.append(btn);

    cardbody.append(rightRow1, rightRow2, rightRow3);
    col2.append(cardbody);
    col1.append(leftRow1, leftRow2, leftRow3);
    row1.append(col1, col2);

    let card = $("<div>")
      .addClass("card mb-3")
      .append(row1);
    post.append(card);
  });
};

// Render Single Post ........................
let renderSinglePost = res => {
  console.log(res);
  post.empty();
  let singlePost = $(".postId");
  singlePost.empty();
  let cardbody = $("<div>").addClass("card-body");
  let title = $("<h5>")
    .addClass("mb-0")
    .text(res.title);
  let body = $("<p>")
    .addClass("card-text")
    .text(res.body);
  let btn = $("<a href='/comments'>")
    .addClass("comment link secondary")
    .data("id", res.id)
    .text("Comment");
  cardbody.append(title, body, $("<hr>"), btn);
  let card = $("<div>")
    .addClass("card mb-3")
    .append(cardbody);
  singlePost.append(card);
};
// function to render components for a post
let renderComments = res => {
  console.log(res);
  post.empty();
  let comment = $(".comment");
  comment.empty();
  res.forEach(results => {
    let commentList = $("<div>").addClass("commentList");
    let commentRow = $("<div>").addClass("row");
    let btnRow = $("<div>").addClass("row");
    let userName = $("<p>")
      .addClass("font-weight-light")
      .text(results.user_name);
    let userComment = $("<p>")
      .addClass("font-weight-normal")
      .text(results.comments);
    let replybtn = $("<a href='#'>")
      .addClass("link secondary font-weight-bold")
      .text("Reply");
    let awardbtn = $("<a href='#'>")
      .addClass("link secondary font-weight-bold")
      .text("Give Award");
    let sharebtn = $("<a href='#'>")
      .addClass("link secondary font-weight-bold")
      .text("Share");
    let savebtn = $("<a href='#'>")
      .addClass("link secondary font-weight-bold")
      .text("Save");
    commentRow.append(userName, $("<hr>"), userComment);
    btnRow.append(replybtn, awardbtn, sharebtn, savebtn);
    commentList.append(commentRow, btnRow);
  });
};

//=============================== API Calls =============================//

// Posts............
let getPosts = () => {
  return $.ajax({
    url: "/api/posts",
    type: "GET"
  });
};

//Create Post ...............
let createPost = data => {
  return $.ajax({
    url: "/api/posts",
    type: "POST",
    data: data
  });
};

// Get Single Posts............
let getSinglePost = id => {
  return $.ajax({
    url: "/api/posts/" + id,
    type: "GET"
  });
};

// Comments............
let commentOnPost = data => {
  return $.ajax({
    url: "/api/comments/",
    type: "POST",
    data: data
  });
};

// Get all Comments for a single post............
let getPostComments = id => {
  return $.ajax({
    url: "/api/posts/" + id,
    type: "GET"
  });
};

// votes.....

let voteOnPost = id => {
  return $.ajax({
    url: "/api/votes/post/" + id,
    type: "GET"
  });
};

let checkIfUserVoted = (postId, userId) => {
  return $.ajax({
    url: "/api/votes/post/" + postId + "/user/" + userId,
    type: "GET"
  });
};

let makeVote = data => {
  return $.ajax({
    url: "/api/votes",
    type: "POST",
    data: data
  });
};

let updateVote = (data, id) => {
  return $.ajax({
    url: "/api/votes/" + id,
    type: "PUT",
    data: data
  });
};

let deleteVote = id => {
  return $.ajax({
    url: "/api/votes/" + id,
    type: "DELETE"
  });
};

//========================== Event LIsteners ===========================//
// function setUp() {
//   if (window.location.pathname === "/") {
//     renderPostFeed();
//     console.log("hey");
//   } else if (window.location.pathname.includes("/subs")) {
//     const splitUrl = window.location.pathname.split("/");
//     const subReddit = splitUrl[2];
//     console.log(splitUrl);
//     // renderSubs(subReddit);
//   }
// }

// $(document).on("ready", function() {
//   if (window.localStorage.getItem("user")) {
//     $("#post").load("/views/reguser.html", setUp);
//   } else {
//     $("#post").load("/views/create.html", setUp);
//   }
// });

// if (window.location.pathname === "/") {
//   $(document).on("ready", renderPostFeed());
// } else if (window.location.pathname.includes("/subs")) {
//   const splitUrl = window.location.pathname.split("/");
//   const subReddit = splitUrl[2];
//   console.log(splitUrl);
//   // renderSubs(subReddit);
// }

//onclick for main post feed on reguser.html......
$(document).on("ready", renderPostFeed());

// LogOut...................
$(".logout").on("click", event => {
  event.preventDefault();
  window.localStorage.removeItem("user");
  window.location.reload();
});
// Comment...................
$(".comment").on("click", event => {
  event.preventDefault();
  renderComments();
});
// Post Comment...................
$(".postComment").on("click", event => {
  event.preventDefault();
  window.localStorage.setItem("comment", res.post_id);
});

// create post............
$(document).on("click", ".create", event => {
  event.preventDefault();
  renderContent("create");
});

// sub...................
$(document).on("click", ".subLink", event => {
  event.preventDefault();
  renderSubs();
});

// create post
$(document).on("click", ".createPost", event => {
  event.preventDefault();
  let postT = $("#post-title")
    .val()
    .trim();
  let postD = $("#post-description")
    .val()
    .trim();
  if (postT.length < 1) {
    $("#post-title").focus();
  } else if (postD.length < 1) {
    $("#post-description").focus();
  } else {
    let data = {
      title: postT,
      body: postD
    };
    createPost(data).then(() => {
      renderContent("myposts");
    });
  }
});

//  vote functions...................
$(document).on("click", ".voteBtn", event => {
  event.preventDefault();

  let val = event.target.value;
  let postId = $(event.target).data("postId");
  let theUserId = userId;
  console.log(val, postId, theUserId);

  checkUserVoter(val, theUserId, postId);
});

function checkUserVoter(val, userId, postId) {
  checkIfUserVoted(postId, userId).then(function(data) {
    console.log(data);
    if (data.length != 0) {
      changeUserVote(val, userId, postId, data);
    } else {
      createUserVote(val, userId, postId);
    }
  });
}
function changeUserVote(val, userId, postId, data) {
  // console.log(val);
  let voteData = {
    UserId: userId,
    PostId: postId
  };
  if (val === "up") {
    if (data[0].up_vote == true) {
      // voteData.up_vote = false;
      deleteVote(data[0].id);
    } else if (data[0].up_vote == null || data[0].up_vote == false) {
      voteData.up_vote = true;
      voteData.down_vote = false;

      updateVote(voteData, data[0].id);
    }
  } else if (val === "down") {
    if (data[0].down_vote == true) {
      deleteVote(data[0].id);
    } else if (data[0].down_vote == null || data[0].up_vote == false) {
      voteData.down_vote = true;
      voteData.up_vote = false;

      updateVote(voteData, data[0].id);
    }
  }
  console.log(voteData);
}

function createUserVote(val, userId, postId) {
  if (val === "up") {
    let voteData = {
      up_vote: true,
      UserId: userId,
      PostId: postId
    };
    makeVote(voteData).then(function(data) {
      console.log(data);
    });
  } else if (val === "down") {
    let voteData = {
      down_vote: true,
      PostId: postId,
      UserId: userId
    };
    makeVote(voteData).then(function(data) {
      console.log(data);
    });
  }
}

function renderSubs() {
  post.empty();
}
