// const getTweets = () => document.getElementsByTagName('article');
// Temporarily only scan the first tweet
const getTweets = () => {
  const [firstTweet] = document.getElementsByTagName('article');
  return [firstTweet];
};

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
    const element = getTweetContentElement(tweet);
    if (!hasBeenAnalysed(element)) {
      const text = getTweetText(tweet);
      analyseText(text, ({ pctAgree }) => {
        addAnalysisToElement(element, pctAgree);
      });
    }
  }
}, 500);
