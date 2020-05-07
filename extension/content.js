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

const hasBeenAnalysed = (tweet) => tweet.children.length > 1;

const addAnalysisToTweet = (tweet, score) => {
  const classification = score > 80 ? 'agree' : 'disagree';
  const response = `Most sources ${classification}, Click Here to find out more`;

  const node = document.createElement(classification);
  node.appendChild(document.createTextNode(`${response} (${score})`));

  if ((!hasBeenAnalysed(tweet))) {
    tweet.appendChild(node);
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
