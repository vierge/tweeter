/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//USE THIS DATA TO CONSTRUCT THE THING

const tweetData = {
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
}

const createTweetElement = (tweetData) => {
  const {user, content, created_at} = tweetData;
  const date = new Date(created_at);
  const postDate = `${date.toUTCString()}:`;

  const markup = `
  <article class="tweet">
  <header>
    <div class="userInfo">
      <img src="${user.avatars}" alt="#" class="avatar" />
      <p class="username">${user.name}</p>
    </div>
    <p class="userAddress">${user.handle}</p>
  </header>
  <article class="content">
    <p>${content.text}</p>
  </article>
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
</article>
  `;  
  return markup;
}

const $tweet = createTweetElement(tweetData);

document.addEventListener('DOMContentLoaded', () => {
  console.log($tweet);
  $('#feed').append($tweet);
});

