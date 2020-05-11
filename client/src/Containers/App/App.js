import React from 'react';
import './App.css';

import Header from '../../Elements/Header';
import Instruction from '../../Components/Instruction';

const App = () => (
  <div className="App">
    <header className="App-header">
      <Header />
      <div className="Content">
        <h1>How does it work?</h1>
        <p> We analysed your tweet and found <span className="Disagree-text">78%</span> of sources disagree with the claim we identified but how did we do this?</p>
        <Instruction stepCount={1} headline={<h1>Send tweet to Hitchhiker's Guide service</h1>} content={
          <div>
            <p>Your extension identified the tweet and sent the contents to our server hosted on IBM cloud</p>
            <img src="tweetBefore.png" />
          </div>} />
        <Instruction stepCount={2} headline={<h1>Extract the central claim</h1>} content={
          <div>
            <p>Using Watson natural language understanding, we analysed your tweet and identified the high-level concepts and keywords. We found the key claim was: </p>
            <div className="Quote">"You cannot contract coronavirus twice"</div>
          </div>} />
        <Instruction stepCount={3} headline={<h1>Find related articles</h1>} content={
          <div>
            <p>Using this analysis we found related articles by doing a google search.</p>
            <p>For your claim, we found over 22.9 million related articles!</p>
            <img src="search.png"/>
          </div>} />
        <Instruction stepCount={4} headline={<h1>Refine related articles</h1>} content={
          <div className="List">
            <p>From these 22.9 million articles, we select the best articles based on the following criteria</p>
            <ul >
              <li>Relevance</li>
              <li>Recentness</li>
              <li>Reliabilty</li>
              <li>Keywords</li>
              <li>And much more!</li>
            </ul>
            <p>This ensures we only inform users of articles which we trust</p>
          </div>} />
        <Instruction stepCount={5} headline={<h1>Analyse each article</h1>} content={
          <div>
            <p>We analyse each article with Watson to determine if the article is for or against the claim in the tweet</p>
            <img src="IBMwatson.png"/>
          </div>} />
        <Instruction stepCount={6} headline={<h1>Generate score</h1>} content={
        <div>
          <p>Once we have analysed each article, we can simply tally up each for and against and calculate a percentage score</p>
          <p><span className="Agree-text">We found 11 articles which agree with the claim</span></p>
          <p><span className="Disagree-text">We found 39 articles which disagree with the claim</span></p>
          <p>So the score for this claim is <span className="Disagree-text">78%</span></p>
        </div>
        } />
        <Instruction stepCount={7} headline={<h1>Highlight the claim</h1>} content={
          <div>
            <p>Finally, we send the score back to your extension to highlight the claim with our findings!</p>
            <img src="tweetAfter.png" />
          </div>} />
      </div>
    </header>
  </div>
);


export default App;
