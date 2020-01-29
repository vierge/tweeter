/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//USE THIS DATA TO CONSTRUCT THE THING

const tweetsArray = [
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

const createTweetElement = (tweetData) => {
  
  const {user, content, created_at} = tweetData;
  const date = new Date(created_at);
  const postDate = `${date.toUTCString()}:`;

  const $tweet = $('<article>').addClass('tweet');

  const markup = `
      <header>
        <div class="userInfo">
          <img src="${user.avatars}" alt="#" class="avatar" />
          <p class="username">${user.name}</p>
        </div>
        <p class="userAddress">${user.handle}</p>
      </header>
      <div class="content">
        <p>${content.text}</p>
      </div>
      <footer>
        <p class="date">
          ${postDate}
        </p>
        <div class="options">
          <a href="#flag">flag</a>
          <a href="#rt">rt</a>
          <a href="#like">like</a>
        </div>
      </footer>
  `;  
    return $tweet.append(markup);
}

const renderTweets = (tweets) => {
  const container = $('#feed').html('');
  // console.log(container);
  tweets.forEach(tweet => {
    container.prepend((createTweetElement(tweet)));
    // console.log(container);
  }); 
}
document.addEventListener('DOMContentLoaded', () => {
  renderTweets(tweetsArray);
});


