import "./App.css";
import React, { useState } from "react";
import CreateTweet from "./components/CreateTweet.js";
import TweetList from "./components/TweetsList.js";
import { useEffect } from "react";

function App() {
  const [tweets, setTweets] = useState([]);
  const addTweet = (newTweet) => {
    console.log(newTweet);
    const newArray = [newTweet, ...tweets];
    setTweets(newArray);
  };
  useEffect(() => {
    const keepTweets = JSON.parse(localStorage.getItem("react-data"));
    if (keepTweets) {
      setTweets(keepTweets);
    }
  }, []);
  useEffect(() => {
    if (tweets.length != 0) {
      localStorage.setItem("react-data", JSON.stringify(tweets));
    }
  }, [tweets]);

  return (
    <div className="appContainer">
      <CreateTweet addTweet={addTweet} />
      <TweetList tweets={tweets} key={tweets.id} />
    </div>
  );
}

export default App;
