const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE userId = $1";
const checkEmailExist =
  "SELECT password,userId,display_name FROM users  WHERE email = $1";
const registerUser =
  "INSERT INTO users (first_name,last_name,dob, display_name,email,password,gender,sexualIntersted,topicAndlifestyle,hashtag,accountType) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
const removeUser = "DELETE FROM users WHERE userId = $1";
const updateUser =
  "UPDATE users SET first_name = $1, last_name = $2, dob = $3, display_name = $4, email = $5, password = $6, gender = $7, sexualIntersted = $8, topicAndlifestyle = $9, hashtag = $10, accountType =$11 WHERE userId = $12";

// login

const loginUser = "INSERT INTO users (email,password) VALUES ($1,$2)";

// Groups

const getGroups = "SELECT * FROM groupss ORDER BY postId OFFSET $1 LIMIT $2";
const getGroupById = "SELECT FROM groupss WHERE groupId = $1 ";
const createGroup =
  "INSERT INTO groupss (group_name,group_username,group_topic,group_description,group_links,group_hashtag,group_subscriptionType,group_subscriptionPrice,group_subscriptionValidity,group_createdBy) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
const updateGroup =
  "UPDATE  groupss SET group_name = $1, group_username = $2, group_topic =$3, group_description =$4, group_links =$5, group_hashtag =$6, group_subscriptionType =$7, group_subscriptionPrice =$8, group_subscriptionValidity =$9, group_createdBy = $10 WHERE groupId = $11";
const deleteGroup = "DELETE FROM groupss WHERE groupId = $1";

// Story

const getStory = "SELECT * FROM story ORDER BY postId OFFSET $1 LIMIT $2";
const createStory =
  "INSERT INTO story (story_img, story_text, story_video, story_shared_by,story_type, storyPostedAt) VALUES ($1,$2,$3,$4,$5,$6)";
const getStoryById = "SELECT * FROM story WHERE storyId = $1";
const updateStory =
  "UPDATE story SET  story_img = $1, story_text= $2, story_video = $3, story_shared_by = $4,story_type = $5, storyPostedAt = $6  WHERE storyId = $7";
const deleteStory = "DELETE FROM story WHERE storyId = $1";

// comment_on_story

const getStoryComment =
  "SELECT * FROM comment_on_story ORDER BY postId OFFSET $1 LIMIT $2";
const createStoryComment =
  "INSERT INTO comment_on_story (comment_text,storyId,comment_at,modified_at) VALUES ($1,$2,$3,$4)";
const getStoryCommentById =
  "SELECT * FROM comment_on_story WHERE commentId = $1";
const updateStoryComment =
  "UPDATE comment_on_story SET comment_text=$1, storyId=$2, comment_at=$3, modified_at =$4 WHERE commentId = $5";
const deleteStoryComment = "DELETE FROM comment_on_story WHERE commentId = $1";

// likes_on_story
const getStoryLikes =
  "SELECT * FROM likes_on_story ORDER BY postId OFFSET $1 LIMIT $2";
const getStoryLikeById = "SELECT * FROM likes_on_story WHERE likeId = $1";
const createStoryLike =
  "INSERT INTO likes_on_story (storyId,liked_at) VALUES ($1,$2) ";

// shares_on_story
const getStoryShare =
  "SELECT * FROM shares_on_story ORDER BY postId OFFSET $1 LIMIT $2";
const getStoryShareById = "SELECT * FROM shares_on_story WHERE shareId = $1";
const createStoryShare =
  "INSERT INTO shares_on_story (storyId, shared_at) VALUES ($1,$2,$3) ";

// Post

const getPost = "SELECT * FROM post ORDER BY postId OFFSET $1 LIMIT $2";
const createPost =
  "INSERT INTO post (post_img,post_text,post_video,posted_by,posted_at,modified_at,isdeleted,isfeautured) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)";
const getUserPostById = "SELECT * FROM post WHERE postId = $1";
const updatePost =
  "UPDATE post SET post_img =$1, post_text =$2, post_video =$3, posted_by =$4, posted_at =$5, modified_at =$6 ,isdeleted = $7, isfeautured = $8 WHERE postId = $9";
const deletePost = "DELETE FROM post WHERE postId = $1";

// comment_on_post

const getComment =
  "SELECT * FROM comment_on_post ORDER BY postId OFFSET $1 LIMIT $2";
const createComment =
  "INSERT INTO comment_on_post (comment_text,postId,comment_at,modified_at) VALUES ($1,$2,$3,$4)";
const getUserCommentById = "SELECT * FROM comment_on_post WHERE commentId = $1";
const updateComment =
  "UPDATE comment_on_post SET comment_text=$1, postId=$2, comment_at=$3, modified_at =$4 WHERE commentId = $5";
const deleteComment = "DELETE FROM comment_on_post WHERE commentId = $1";

// likes_on_post

const getLikes =
  "SELECT * FROM likes_on_post ORDER BY postId OFFSET $1 LIMIT $2";
const getLikeById = "SELECT * FROM likes_on_post WHERE likeId = $1";
const createLike =
  "INSERT INTO likes_on_post (postId,liked_at) VALUES ($1,$2) ";

// shares_on_post

const getShare =
  "SELECT * FROM shares_on_post ORDER BY postId OFFSET $1 LIMIT $2";
const getShareById = "SELECT * FROM shares_on_post WHERE shareId = $1";
const createShare =
  "INSERT INTO shares_on_post (postId, shared_at) VALUES ($1,$2,$3) ";

// save_post

const getSavepost = "SELECT * FROM save_post ";
const createSavepost =
  "INSERT INTO save_post (postId,saved_at) VALUES ($1,$2) ";

// Subsribe

const getSubscribers =
  "SELECT * FROM subscribe ORDER BY postId OFFSET $1 LIMIT $2";
const getSubscriberById = "SELECT * FROM subscribe WHERE subscribeId = $1";
const createSubscriber =
  "INSERT INTO subscribe (subscribed_by,subscribed_to,subscribed_at,unsubscribed_at) VALUES ($1,$2,$3,$4) ";

// Follow

const getFollowers = "SELECT * FROM follow ORDER BY postId OFFSET $1 LIMIT $2";
const getFollowerById = "SELECT * FROM follow WHERE followId = $1";
const createFollower =
  "INSERT INTO follow(follow_by,follow_to,followed_at,status) VALUES ($1,$2,$3,$4) ";

// Homefeed

const getHomefeed =
  "select users.first_name, users.last_name, users.display_name, post.post_text, post.post_img, post.post_video, post.posted_at, count( comment_on_post.commentId)as comment_count,count(post.postId) as post_count,count(likes_on_post.likeId) as likes_count from users inner join post on users.userId = post.posted_by left join comment_on_post on post.postId = post.postId left join likes_on_post on post.postId = post.postId group by users.first_name, users.last_name, users.display_name, post.post_text, post.post_img, post.post_video, post.posted_at, comment_on_post.commentId ,likes_on_post.likeId ";

// Match

const getMatches = "SELECT * FROM matches ORDER BY postId OFFSET $1 LIMIT $2";
const getMatchById = "SELECT * FROM matches WHERE matchId = $1";
const createMatch =
  "INSERT INTO matches(match_by,match_to,match_at,status) VALUES ($1,$2,$3,$4) ";

// Events
const getEvents = "SELECT * FROM events";
const getEventById = "SELECT * FROM events WHERE eventId = $1";
const createEvent =
  "INSERT INTO events (event_title,event_img,event_video,event_description,event_date,event_time,ended_at,started_at,event_type,event_restriction,eventCreated_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ";
const updateEvent =
  "UPDATE events SET event_title = $1,event_img = $2,event_video =$3, event_description =$4, event_date = $5, event_time = $6, ended_at = $7, started_at =$8, event_type = $9, event_restriction = $10, eventcreated_by = $11 WHERE eventId = $12";
const deleteEvent = "DELETE FROM events WHERE eventId = $1";

// Channel
const getChannels = "SELECT * FROM channel";
const getChannelById = "SELECT * FROM channel WHERE channelId = $1";
const createChannel =
  "INSERT INTO channel (channel_name,channel_username,channel_type,channel_description,channel_link,channel_hashtag,channel_createdBy,channel_created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ";
const updateChannel =
  "UPDATE channel SET channel_name = $1,channel_username = $2,channel_type =$3, channel_description =$4, channel_link = $5, channel_hashtag = $6, channel_createdBy = $7, channel_created_at =$8  WHERE channelId = $9";
const deleteChannel = "DELETE FROM channel WHERE channelId = $1";

// channelSubscription

const getSubscriptions = "SELECT * FROM channelSubscription";
const getSubscriptionById =
  "SELECT * FROM channelSubscription WHERE subscriptionId = $1";
const createSubscription =
  "INSERT INTO channelSubscription (subscription_type,subscription_price,subscription_validity,subscribed_to) VALUES ($1,$2,$3,$4) ";
const updateSubscription =
  "UPDATE channelSubscription SET subscription_type = $1, subscription_price = $2, subscription_validity = $3, subscribed_to =$4 WHERE subscriptionId = $5";

// ShopItem

const getShopitems =
  "SELECT * FROM shop_item ORDER BY postId OFFSET $1 LIMIT $2";
const getShopitemById = "SELECT * FROM shop_item WHERE itemId = $1";
const createShopitem =
  "INSERT INTO shop_item (item_name, brand_name,description,item_variation,item_size,item_sellType,item_price,item_endTime,item_photos,item_postedAt,item_createdBy) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ";
const updateShopitem =
  "UPDATE shop_item SET item_name =$1, brand_name =$2, description =$3, item_variation =$4, item_size =$5,item_sellType =$6, item_price =$7, item_endTime =$8, item_photos =$9, item_postedAt =$10, item_createdBy =$11  WHERE itemId = $12";
const deleteShopitem = "DELETE FROM shop_item WHERE itemId = $1";

module.exports = {
  // Register
  getUsers,
  getUserById,
  checkEmailExist,
  registerUser,
  removeUser,
  updateUser,

  // Login
  loginUser,

  // Post
  createPost,
  getPost,
  getUserPostById,
  updatePost,
  deletePost,

  // Groups
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,

  // Story
  getStory,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,

  // story_comment

  getStoryComment,
  getStoryCommentById,
  createStoryComment,
  updateStoryComment,
  deleteStoryComment,

  // storylikes

  getStoryLikes,
  getStoryLikeById,
  createStoryLike,

  // storyshare

  getStoryShare,
  getStoryShareById,
  createStoryShare,

  // Comment
  getComment,
  getUserCommentById,
  createComment,
  updateComment,
  deleteComment,

  // Likes
  getLikes,
  getLikeById,
  createLike,

  // Share

  getShare,
  getShareById,
  createShare,

  // save_post

  getSavepost,
  createSavepost,

  // Subscribe

  getSubscribers,
  getSubscriberById,
  createSubscriber,

  // Follow

  getFollowers,
  getFollowerById,
  createFollower,

  // Homefeed

  getHomefeed,

  // Match

  getMatches,
  getMatchById,
  createMatch,

  // Events

  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,

  // Channel

  getChannels,
  getChannelById,
  createChannel,
  updateChannel,
  deleteChannel,

  // channelSubscription
  getSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,

  // ShopItem

  getShopitems,
  getShopitemById,
  createShopitem,
  updateShopitem,
  deleteShopitem,
};
