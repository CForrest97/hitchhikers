<h1 align="center">Welcome to Hitchhikers 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-Apache2-yellow.svg" />
  </a>
</p>

> Helping people spot misinformation on the internet, using Watson Natural Language Understanding

## Contents

1. [Description](#description)
1. [Demo video](#demo-video)
1. [The architecture](#the-architecture)
1. [Project roadmap](#project-roadmap)
1. [Getting started](#getting-started)
1. [Running the tests](#running-the-tests)
1. [Built with](#built-with)
1. [Authors](#authors)
1. [License](#license)
1. [Acknowledgments](#acknowledgments)

## Description

### What's the problem?

Anyone that uses social media will have come into contact with misinformation or fake news. While some people are able to recognise it as fake news, many can not and will heed the advice or worse, help spread it like wild fire.

In the recent COVID-19 pandemic, misinformation and fake news have led to fatal outcomes on numerous occasions. 

While social media companies like Facebook and Twitter have made recent efforts to remove or flag misinformation on their sites, they are struggling to keep up with the ever increasing workload.

In 2019, fact checking companies such as snopes.com quit working with Facebook, due to an unmanageable workload [7]. In March and April 2020, Facebook placed warning labels on 90 million pieces of content related to COVID-19 alone [1].

In order to cope, fact checking responsibilities are being farmed out to third party companies, who mostly employ temporary workers on precarious contracts. As a result removal of misinformation is often missed or left up on the platform in error [6].

Facebook themselves admitted a 10% error rate, equating to 300,000 daily posts left up [6]. 

We are left to question, is enough being done?

[1] https://www.bbc.co.uk/news/technology-52903680

[2] https://www.independent.co.uk/news/world/middle-east/coronavirus-iran-deaths-toxic-methanol-alcohol-fake-news-rumours-a9487801.html

[3] https://twitter.com/realDonaldTrump/status/1241367239900778501?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1241367239900778501&ref_url=https%3A%2F%2Fwww.bbc.co.
uk%2Fnews%2Fstories-52731624

[4] https://www.bbc.co.uk/news/stories-52731624

[5] https://www.independent.co.uk/news/uk/home-news/fake-news-facebook-twitter-share-misinformation-survey-a8908361.html

[6] https://www.technologyreview.com/2020/06/08/1002894/facebook-needs-30000-of-its-own-content-moderators-says-a-new-report/

[7] https://www.telegraph.co.uk/technology/2019/02/02/snopes-quits-facebooks-fact-checking-programme-saying-has-become/


### Solution
We wanted to provide a way for the user to get instant feedback regarding information in a post or article they are reading, and we wanted to do this in a way that was seamless to their experience. We came up with the idea of using a Chrome extension to highlight a webpage as the user is reading it so that they instantly know whether they should trust or research the message further.

Our process is as follows:
1. When a user is browsing social media, The Hitchhiker's Guide uses IBM Watson's Natural Language processing and sentiment analysis to extract the central "Claim" from the post.
1. Next we convert the "Claim" into a searchable query and then use the Microsoft Bing search API to find articles with a range of opinions on the topic.
1. Then IBM Watson is again utilised to decide whether the articles returned from the Bing search agree or disagree with the "Claim" and provides a percentage summary to indicate the general consensus.
1. Once the data is received by the Chrome extension the social media post is highlighted to give the user instant feedback. 

The Hitchhiker's Guide helps fact-checkers by removing a lot of the menial tasks such as conducting the search and finding the articles. It also provides a snapshot of the current public opinion on the given statement.

Additionally, our solution can be used for more than helping to identify and review misinformation 
regarding COVID-19, it can be used in all other opinion rich areas such as climate change and politics. 


## Demo video
[Watch the Video](https://youtu.be/CKrPHHcnX9c)

## The architecture
![Architecture diagram](./images/architectureDiagram.png)

## Project roadmap
TODO: Make roadmap
![Roadmap](roadmap.jpg)

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Google Chrome to run the extension
* Node.js
* An API Key and URL for IBM Watson Natural Language
```sh
# export these into your terminal before you run it
export NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY="";
export NATURAL_LANGUAGE_UNDERSTANDING_URL="";
# See more here: https://www.npmjs.com/package/@ibm-watson/natural-language-understanding-nodejs#prerequisites
```


* An API Key for Microsoft Bing Search API
```sh
# export these into your terminal before you run it
export BING_SEARCH_APIKEY="";
# See more here: https://azure.microsoft.com/en-us/services/cognitive-services/bing-news-search-api/
```

### Install and build

```sh
# From top level directory

# Install dependencies
npm run install:all

# Build client
npm run build:all
```

### Usage


#### Server

```sh
# From top level directory
npm start
```

#### Chrome Extension

```
Visit: chrome://extensions/
Enable: Developer mode
Press: Load Unpacked
Click: extension folder
```

Once the server is running and you've loaded the Chrome Extension, go to your Twitter timeline and watch as the Tweets are analysed.

From there you can easily see the different view points by clicking on the "click here for more information" button that is highlighted.

## Running the server tests
*Note: you need the API keys as described in the prerequisites*

```bash
cd server && npm install && npm run apitest
```

## Built with

* [IBM Watson Natural Language](https://www.ibm.com/uk-en/cloud/watson-natural-language-understanding) - Used to extract the "claim" from a social media post
* [Microsoft Bing Search API](https://azure.microsoft.com/en-us/services/cognitive-services/bing-news-search-api/) - Used to get articles about a topic
* [Express.js](https://expressjs.com/) - Powers the Node.js server
* [React.js](https://reactjs.org/) - Handles the front end (Home and more info pages)

## Authors

* **Craig Forrest** - *Initial work, recently left IBM* - https://github.com/CForrest97
* **Richard Waller** - https://github.com/rwalle61
* **Matt Emerson** - https://github.com/mattemerson1
* **Cameron Roberts** - https://github.com/cameronldroberts
* **James Wallis** - https://github.com/james-wallis

See also the list of [contributors](https://github.com/james-wallis/hitchhikers/graphs/contributors) who participated in this project.

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Based on [the Code and Response README template](https://github.com/Code-and-Response/Project-Sample/blob/master/README.md).
