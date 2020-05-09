const getTweets = () => document.getElementsByTagName('article');

const getTweetContentElement = (tweet) => {
  // Get tweet content on single tweet status page
  const [authorDiv] = tweet.querySelectorAll('[data-testid="tweet"]');
  if (authorDiv) {
    const tweetContainer = authorDiv.nextElementSibling;
    if (tweetContainer) {
      const tweetContent = tweetContainer.firstChild;
      return tweetContent;
    }
  }

  // Get tweet content for page with lots of tweets
  // Only one retweet row per tweet
  const [retweetrow] = tweet.querySelectorAll('[role="group"]');
  if (retweetrow) {
    // the element above the retweet row is usually extra content (i.e. video)
    const extracontent = retweetrow.previousElementSibling;
    // the element above the extra content is usually the content
    if (extracontent) {
      const tweetContent = extracontent.previousElementSibling;
      return tweetContent;
    }
  }

  return null;
};

const getTweetText = (tweet) => {
  const tweetContent = getTweetContentElement(tweet);
  if (tweetContent) {
    return tweetContent.textContent;
  }
  return null;
};

const analyseTweet = (tweet, callback) => {
  const content = getTweetText(tweet);
  const http = new XMLHttpRequest();
  const url = 'http://localhost:4242/analyse';

  http.open('POST', url, { body: true });
  http.setRequestHeader('Content-Type', 'application/json');
  http.send(JSON.stringify({ claim: content }));
  http.onreadystatechange = () => callback(http.response);
};

const hasBeenAnalysed = (tweet) => tweet.getAttribute('analysed') === 'true';

const addAnalysisToTweet = (tweet, score) => {
  if ((!hasBeenAnalysed(tweet))) {
    const tweetContent = getTweetContentElement(tweet);
    const classification = score > 80 ? 'agree' : 'disagree';

    // Only add the text if the element that should have text has a height (is not just a video)
    if (tweetContent.offsetHeight > 0) {
      const text = document.createElement('P');
      text.className = `${classification}-text`;
      text.innerHTML = `Most sources ${classification}, Click <span class="click-here">Here</span> to find out more`;
      tweetContent.insertAdjacentElement('afterend', text);
      tweetContent.classList += ` ${classification}-block`;
    }

    // Finally, show that the tweet has been analysed
    tweet.setAttribute('analysed', true);
  }
};

setInterval(() => {
  const tweets = getTweets();
  for (let index = 0; index < tweets.length; index += 1) {
    const tweet = tweets[index];
    if (!hasBeenAnalysed(tweet)) {
      analyseTweet(tweet, (response) => {
        const { score } = JSON.parse(response);
        addAnalysisToTweet(tweet, score);
      });
    }
  }
}, 1000);
