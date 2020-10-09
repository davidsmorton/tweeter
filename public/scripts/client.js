/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// database....
////Helper Functions
const escape =  function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const hideError = function() {

  $("#errorContainer").slideUp(150);
  $("#errorText").html("");
};
const showError = function(message) {

  $("#errorText").html(message);
  $("#errorContainer").slideDown(150);
};

// JQUERY USED
$(document).ready(function() {
  loadTweets();
  postTweetsToServer();
  hideError();

  //Allows User to enter text with "enter key"
  // reference stackoverflow
  $("#tweet-text").keypress(function(e) {
    if (e.which == 13 && !e.shiftKey) {
      $(this).closest("form").submit();
      e.preventDefault();

    }
  });
});

// Function that takes formatted tweets and saves them in the DOM
const renderTweets = function(tweets) {
  const tweetsContainer = $('#tweets-container');
  tweetsContainer.empty();
  tweets.forEach(tweet => {
    const formattedTweet = tweetFormatter(tweet);
    tweetsContainer.append(formattedTweet); //update the DOM here
  });
};

// Function that formats (CSS & HTML) tweets from server
const tweetFormatter = function(tweet) {
  // check out object destructing...
  const date = new Date(tweet.created_at);
  return $(`
      <article class="tweet">
        <header>
          <div class="picName">
            <img class="profilePic" src="${escape(tweet.user.avatars)}">   
            <p class="userName">${escape(tweet.user.name)}</p> 
          </div>
          <p class="handle">${escape(tweet.user.handle)}</p>
        </header>
        <p class="actualTweetText">${escape(tweet.content.text)}</p> 
        <footer>
          <p class="tweetDate">${escape(date.toLocaleString())}</p>  
          <div class="icons">
            <img src="/images/flag.jpg">
            <img src="/images/retweet.svg">
            <img src="/images/heart.png">
          </div>
        </footer>
      </article>
    `);
};

//AJAX Requests (jQuery)

// POST //

const postTweetsToServer = function() {
  const form = $('.new-tweet .subTweet');
  form.on('submit', function(event) {
    event.preventDefault();
    const errorNoText = "Please enter text to tweet your thoughts";
    const errorTooLongTweet = "Please reduce the number of characters in your tweet to 140.";


    if ($('#tweet-text').val().length <= 0)  {
      hideError();
      showError(errorNoText);
    } else if ($('#tweet-text').val().length > 140) {
      hideError();
      showError(errorTooLongTweet);
    } else {
      hideError();
      console.log('Button clicked, performing ajax call...');
      // Sending data changing it to HTTP string
      $.ajax('/tweets', {
        method: 'POST',
        data: $(this).serialize()
      })
        .then(function(response) {
          console.log('Success: ', response);
          $('#tweet-text').val("");
          $('.counter').val(140);
          loadTweets();
        })
        .catch(function(err) {
          console.log('Error:', err);
        });
            
    }
  });
};
// GET //
const loadTweets = function() {

  // Getting data in json

  $.ajax('/tweets', {
    method: 'GET',
    data: '#tweets-container'
  })
    .then(function(response) {
      console.log('Success: ', response);
      renderTweets(response.reverse());
    })
    .catch(function(err) {
      console.log('Error:', err);
    });
};









