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

setInterval(() => {
  const tweets = getTweets();
  for (let index = 0; index < tweets.length; index += 1) {
    const tweet = tweets[index];
    if (!hasBeenAnalysed(tweet)) {
      const text = getTweetText(tweet);
      analyseText(text, ({ score }) => {
        const element = getTweetContentElement(tweet);
        addAnalysisToElement(element, score);
      });
    }
  }
}, 1000);
