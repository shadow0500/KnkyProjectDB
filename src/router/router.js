const { Router } = require("express");
const user = require("../controller/user");
const post = require("../controller/post");
const groupss = require("../controller/groupss");
const stories = require("../controller/stories");
const storycomments = require("../controller/storycomments");
const storylikes = require("../controller/storylikes");
const storyshare = require("../controller/storyshare");
const commentt = require("../controller/commentt");
const likes = require("../controller/likes");
const share = require("../controller/share");
const subscribe = require("../controller/subscribe");
const follow = require("../controller/follow");
const matches = require("../controller/matches");
const events = require("../controller/events");
const channel = require("../controller/channel");
const channelsubscription = require("../controller/channelsubscription");
const shopitem = require("../controller/shopitem");
const homefeed = require("../controller/homefeed");
const savepost = require("../controller/savepost");
const { authenticateJWT } = require("../middleware/auth");
const { createAccountSchema } = require("../middleware/joiSchema");
const { updateAccountSchema } = require("../middleware/joiSchema");
const { createChannelSchema } = require("../middleware/channelSchema");
const { createEventSchema } = require("../middleware/eventSchema");
const { createGroupSchema } = require("../middleware/groupSchema");
const { createShopItemSchema } = require("../middleware/shopitemSchema");

const router = Router();

// Register

router.get("/", user.getUsers);
router.post("/register", createAccountSchema, user.registerUser);
router.get("/:id", user.getUserById);
router.delete("/:id", user.removeUser);
router.put("/:id", updateAccountSchema, user.updateUser);

// Login

router.post("/login", user.loginUser);

// router.delete("/logout",user.logoutUser);

// Groups

router.get("/groupss/getgroups", groupss.getGroups);
router.get("/groupss/:id", groupss.getGroupById);
router.post("/groupss/createusergroup", createGroupSchema, groupss.createGroup);
router.put("/groupss/updategroup/:id", groupss.updateGroup);
router.delete("/groupss/deletegroup/:id", groupss.deleteGroup);

// Stories
router.get("/story/getstories", stories.getStory);
router.get("/story/:id", stories.getStoryById);
router.post("/story/createstory", stories.createStory);
router.put("/story/updatestory/:id", stories.updateStory);
router.delete("/story/deletestoryp/:id", stories.deleteStory);

// comments on story
router.get("/commentt/getstorycomment", storycomments.getStoryComment);
router.get("/commentt/storycomment/:id", storycomments.getStoryCommentById);
router.post("/commentt/createstorycomment", storycomments.createStoryComment);
router.put(
  "/commentt/updatestorycomment/:id",
  storycomments.updateStoryComment
);
router.delete(
  "/commentt/deletestorycomment/:id",
  storycomments.deleteStoryComment
);

// likes_on_story

router.get("/likes/getstoryikes", storylikes.getStoryLikes);
router.get("/likes/storylikes/:id", storylikes.getStoryLikeById);
router.post("/likes/createstorylike", storylikes.createStoryLike);

// shares_on_story

router.get("/share/getstoryshares", storyshare.getStoryShare);
router.get("/share/storyshare/:id", storyshare.getStoryShareById);
router.post("/share/createpostshare", storyshare.createStoryShare);

// Post

router.get("/post/getuserpost", authenticateJWT, post.getPost);
router.get("/post/:id", post.getUserPostById);
router.post("/post/createuserpost", authenticateJWT, post.createPost);
router.put("/post/updatepost/:id", post.updatePost);
router.delete("/post/deletepost/:id", post.deletePost);

// Comment

router.get("/post/getpostcomment", commentt.getComment);
router.get("/post/likes/:id", commentt.getUserCommentById);
router.post("/post/createpostcomment", commentt.createComment);
router.put("/post/updatepostcomment/:id", commentt.updateComment);
router.delete("/post/deletepostcomment/:id", commentt.deleteComment);

// Likes

router.get("/post/getpostikes", likes.getLikes);
router.get("/post/likes/:id", likes.getLikeById);
router.post("/post/createpostlike", likes.createLike);

// Share

router.get("/post/getpostshares", share.getShare);
router.get("/post/share/:id", share.getShareById);
router.post("/post/createpostshare", share.createShare);

// save_post

router.get("/post/savepost", savepost.getSavepost);
router.post("/post/createsavepost", savepost.createSavepost);

// Subscribe

router.get("/subscribe/getsubscriber", subscribe.getSubscribers);
router.get("/subscribe/:id", subscribe.getSubscriberById);
router.post("/subscribe/createsubscriber", subscribe.createSubscriber);

// Follow

router.get("/follow/getfollowers", follow.getFollowers);
router.get("/follow/:id", follow.getFollowerById);
router.post("/follow/createfollower", follow.createFollower);

// Homefeed

router.get("/homefeed/gethomefeed", homefeed.getHomefeed);

// Matches

router.get("/matches/getmatches", matches.getMatches);
router.get("/matches/:id", matches.getMatchById);
router.post("/matches/creatematch", matches.createMatch);

// Events
router.get("/events/getallevents", events.getEvents);
router.get("/events/:id", events.getEventById);
router.post("/events/createvent", createEventSchema, events.createEvent);
router.put("/events/updateevent/:id", events.updateEvent);
router.delete("/events/deleteevent/:id", events.deleteEvent);

//Channel

router.get("/channel/getallchannel", channel.getChannels);
router.get("/channel/:id", channel.getChannelById);
router.post(
  "/channel/creatchannel",
  createChannelSchema,
  channel.createChannel
);
router.put("/channel/updatechannel/:id", channel.updateChannel);
router.delete("/channel/deletechannel/:id", channel.deleteChannel);

// Channel Subscription

router.get(
  "/channelsubscription/getsubscription",
  channelsubscription.getSubscriptions
);
router.get("/channelsubscription/:id", channelsubscription.getSubscriptionById);
router.post(
  "/channelsubscription/creatsubscription",
  channelsubscription.createSubscription
);
router.put(
  "/channelsubscription/updatesubscription/:id",
  channelsubscription.updateSubscription
);

// Shopitem
router.get("/shopitem/getallshopitem", shopitem.getShopitems);
router.get("/shopitem/:id", shopitem.getShopitemById);
router.post(
  "/shopitem/creatshopitem",
  createShopItemSchema,
  shopitem.createShopitem
);
router.put("/shopitem/updateshopitem/:id", shopitem.updateShopitem);
router.delete("/shopitem/deleteshopitem/:id", shopitem.deleteShopitem);

module.exports = router;
