/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Fake data taken from initial-tweets.json
const tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// Put commments here
$(document).ready(function() {
  renderTweets(tweets)
});

// Put commments here
const renderTweets = function(tweets) {
  let tweetsContainer = $('#tweets-container')
  // next level challange use .forEach ()
  tweets.forEach(tweet => {
    let formattedTweet = tweetFormatter(tweet)
    tweetsContainer.append(formattedTweet); //update the DOM?
  } )

}

// Put commments here
const tweetFormatter = function(tweet) {
  // check out object destructing...
  let date = new Date(tweet.created_at) 
   return (
     $(
    `<article class="tweet">
      <header>
        <div class="picName">
          <img class="profilePic" src="${tweet.user.avatars}">   
          <p class="userName">${tweet.user.name}</p> 
        </div>
        <p class="handle">${tweet.user.handle}</p>
      </header>
      <p class="actualTweetText">${tweet.content.text}</p> 
      <footer>
        <p class="tweetDate">${date.toLocaleString()}</p>  
        <div class="icons">
          <img src="/images/flag.jpg">
          <img src="/images/retweet.svg">
          <img src="/images/heart.png">
        </div>
      </footer>
    </article>`
      )
) 

};


