const getTweets = () => document.getElementsByTagName('article');

const getTweetContent = (tweet) => {
  const x = tweet
    .children[0]
    .children[1]
    .children[1]
    .children[1]
    .children;

  const y = x[0].children.length ? x[0] : x[1];
  return y
    .children[0]
    .children[0]
    .textContent;
};

const analyseTweet = (tweet, callback) => {
  const content = getTweetContent(tweet);
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
    const classification = score > 80 ? 'agree' : 'disagree';

    // Only one retweet row per tweet
    const [retweetrow] = tweet.querySelectorAll('[role="group"]');

    // the element above the retweet row is usually extra content (i.e. video)
    const extracontent = retweetrow.previousElementSibling;

    // the element above the extra content is usually the content
    const tweetContent = extracontent.previousElementSibling;
    tweetContent.classList += ` ${classification}-block`;

    // Only add the text if the element that should have text has a height (is not just a video)
    if (tweetContent.offsetHeight > 0) {
      const text = document.createElement('P');
      text.className = `${classification}-text`;
      text.innerHTML = `Most sources ${classification}, Click <span class="click-here">Here</span> to find out more`;
      tweetContent.insertAdjacentElement('afterend', text);
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
