import React from 'react';
import './App.css';

import Instruction from './components/Instruction';
import Header from './elements/Header';
import Title from './elements/Title';

const headings = [
  `Select tweet, and send to Hitchhiker's Guide service`,
  `Extract the central claim`,
  `Find related articles`,
  `Refine list of related articles`,
  `Analyse each article`,
  `Generate score`,
  `Highlight the claim`,
]

const content = [
  <img src="tweetBefore.png" />,
  <h1>"You cannot contract coronavirus twice"</h1>,
  <img src="relatedarticles.png" />,
  null,
  <img src="IBMwatson.png" />,
  <span className="disagree-text">75% of sources disagree</span>,
  <img src="tweetAfter.png" />,
]

const App = () => (
    <div className="App">
      <header className="App-header">
        <Header />
        <Title>
          <p>How does it work?</p>
        </Title>
        {headings.map((text, index) => <Instruction stepCount={index + 1} heading={text} key={index} children={content[index]} />)}
      </header>
    </div>
  );

export default App;
