import React from 'react';
import CreateTweet from './CreateTweet.js';
import TweetList from './TweetsList.js';

function HomePage() {
  return (
    <div>
      <CreateTweet/>
      <TweetList/>
    </div>
  );
}

export default HomePage;