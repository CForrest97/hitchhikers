import React from 'react';
import Header from '../Elements/Header';
import Instruction from '../Components/Instruction';

const HowItWorks = () => (
  <>
    <Header />
      <div className="Content">
        <h1>How does it work?</h1>
        <p> We found that <span className="Disagree-text">78%</span> of sources disagree with this tweet. Here's how we did it:</p>
        <Instruction stepCount={1} headline={<h1>Send tweet to Hitchhiker's Guide service</h1>} content={
          <div>
            <p>Our browser extension read the tweet and sent it to our server, running on IBM cloud.</p>
            <div className="ImgContainer">
              <img src="tweetBefore.png" />
            </div>
          </div>} />
        <Instruction stepCount={2} headline={<h1>Extract the tweet's central claim</h1>} content={
          <div>
            <p>Using IBM Watson, we analysed the tweet to identify its main argument: </p>
            <div className="Quote">"People are immune to Coronavirus if they've already had it"</div>
          </div>} />
        <Instruction stepCount={3} headline={<h1>Find related articles</h1>} content={
          <div>
            <p>We searched on Google for related articles. We found over 324 million results!</p>
            <div className="ImgContainer">
              <img src="search.png"/>
            </div>
          </div>} />
        <Instruction stepCount={4} headline={<h1>Refine related articles</h1>} content={
          <div className="List">
            <p>Of these 324 million results, we select the most trustworthy articles, using this criteria:</p>
            <ul>
              <li>Relevance</li>
              <li>Recentness</li>
              <li>Reliabilty</li>
              <li>Keywords</li>
              <li>And much more!</li>
            </ul>
          </div>} />
        <Instruction stepCount={5} headline={<h1>Determine which sources agree and disagree with the tweet</h1>} content={
          <div>
            <p>We use IBM Watson to analyse each sources's arguments to decide whether the source agrees or disagrees with the tweet.</p>
            <div className="ImgContainer">
              <img src="IBMwatson.png"/>
            </div>
          </div>} />
        <Instruction stepCount={6} headline={<h1>Summarise results into a single score</h1>} content={
        <div>
          <p>We tally up the sources for and against the tweet, to calculate an overall percentage</p>
          <p><span className="Agree-text">We found 11 articles which agree with the claim</span></p>
          <p><span className="Disagree-text">We found 39 articles which disagree with the claim</span></p>
          <p>So the score for this claim is <span className="Disagree-text">78%</span></p>
        </div>
        } />
        <Instruction stepCount={7} headline={<h1>Highlight the tweet as you read it</h1>} content={
        <div>
          <p>Finally, we send the score back to your extension, which highlights the claim with our findings!</p>
          <div className="ImgContainer">
            <img src="tweetAfter.png" />
          </div>
        </div>} />
    </div>
  </>
)

export default HowItWorks;
