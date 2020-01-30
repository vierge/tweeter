/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//USE THIS DATA TO CONSTRUCT THE THING


// const tweetsArray = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

document.addEventListener('DOMContentLoaded', () => {
  // load the page scripts
  tweetDaemon();
  loadTweets();

  // tweet window listener
  $('.WRITE').click(function() {
    $('.container').toggleClass('exposed');
    $('.error').removeClass('exposed');
  });
  });

  // invalid tweet listener
loadTweets = () => {
  $.ajax('/tweets', {
    method: 'GET'
  })
  .then(function(gotten) {
    renderTweets(gotten);
  });
}

const tweetDaemon = () => {
  $('#new-tweet form').submit(function(event) {
    $('.error').removeClass('exposed');
    event.preventDefault();
    const $data = $(this).serialize();
    if ($data.length <= 5 || $data.length > 145) {
      $('.error').addClass('exposed');
      $('.error p').text(
        $data.length <= 5 ? 
        `There's nothing to post!` :
          `Your post is too long!`
      )
    } else {
      // AJAX calls contain an object with the properties of the request.
      $.ajax({
        type: 'POST',       // the verb
        url: '/tweets',  // the target address
        data: $data,               // the data to send
        // dataType: 'text',     // the data type to expect in response
      })
      .fail((xhr, status, error) => {
        console.log(xhr)
        console.log(error)
        console.log(status)
      })
      .done(() => {
        $('#new-tweet textarea').val('');
        $('.counter').text('140');
        loadTweets();
      });
    }
  })
}

const createTweetElement = (tweetData) => {
  
  const {user, content, created_at} = tweetData;
  const date = new Date(created_at);
  const postDate = `${date.toUTCString()}:`;
  const $tweet = $('<article>').addClass('tweet');
  const safetext = escape(content.text);

  // if (content['text'].includes('<script>')) {
  //   content.text = `${escape(content.text)}`;
  // }

  const markup = `
      <header>
        <div class="userInfo">
          <img src="${user.avatars}" alt="#" class="avatar" />
          <p class="username">${user.name}</p>
        </div>
        <p class="userAddress">${user.handle}</p>
      </header>
      <div class="content">
        <p>${content.text.includes('<script>') ? safetext : content.text}</p>
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
  const container = $('#feed').text('');
  // console.log(container);
  tweets.forEach(tweet => {
    container.prepend((createTweetElement(tweet)));
    // console.log(container);
  }); 
}


const escape = (string) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
}


