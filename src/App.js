import "./App.css";
import React, { useState } from "react";
import CreateTweet from "./components/CreateTweet.js";
import TweetList from "./components/TweetsList.js";
import { useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./components/LoadingSpinner.js";


function App() {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const addTweet = (newTweet) => {
    setIsLoading(true);
    console.log(newTweet);
    const newArray = [newTweet, ...tweets];
    setTweets(newArray);
   setIsLoading(false);
  };

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet"
      );
      setTweets(response.data.tweets);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const postTweet = (tweetData) => {
    axios
      .post(
        "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet",
        tweetData
      )
      .then(fetchData);
  };

  return (
    <div className="appContainer">
      <CreateTweet addTweet={addTweet} onAdd={postTweet} isLoading={isLoading}/>
      <TweetList tweets={tweets} isLoading={isLoading} />
    </div>
  );
}

export default App;
