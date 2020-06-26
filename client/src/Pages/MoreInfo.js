import React, { useEffect, useState } from 'react';
import {
  useParams
} from "react-router-dom";
import axios from "axios";
import Header from '../Elements/Header';
import Instruction from '../Components/Instruction';

const bingSearchBaseURL = 'https://www.bing.com/search?q=';

const MoreInfo = () => {
  const { claimID } = useParams();
  const [claimData, setClaimData] = useState({
    claim: null,
    pctAgree: null,
    searchResults: {},
  });

  useEffect(() => {
    axios.get(`/api/find-out-more/${claimID}`)
      .then(function (response) {
        // handle success
        console.log(response);
        setClaimData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])

  const { claim, pctAgree, searchResults, searchQuery } = claimData;
  console.log(claimData);
  return (
    <>
      <Header />
        <div className="Content more-info">
          <h1><strong>Claim:</strong> {claim}</h1>
          <p className="percent">{pctAgree}% of sources agree with this tweet.</p>
          <p className="search-query">Search Query: {searchQuery}</p>
          <a className="search-query" href={`${bingSearchBaseURL}${searchQuery}`}>Search this on Bing</a>
          {markUpResults(searchResults)}
      </div>
    </>
  )
}

const markUpForOrAgainst = (results, key) => {
  const term = (key === 'for') ? 'agree' : 'disagree';
  return <div>
    <h2>Sources that {term}</h2>
    {(results && results.hasOwnProperty(key)) ? results[key].map(({ name, provider, url }) => (
      <div className='results'>
        <p className='name'>{name}</p>
        <p className='provider'>Author: {provider}</p>
        <a href={url} target='_blank'>Read Article</a>
      </div>
    )) : <p>No sources {term}</p>}
  </div>
}

const markUpResults = (results) => {
  const keys = ['for', 'against'];
  return keys.map(key => markUpForOrAgainst(results, key));
}

export default MoreInfo;
