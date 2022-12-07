import "./App.css";
import React, { useState } from "react";
import CreateTweet from "./components/CreateTweet.js";
import TweetList from "./components/TweetsList.js";
import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile.js";
import { useNavigate, useParams } from "react-router-dom";

function App() {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const addTweet = (newTweet) => {
    setIsLoading(true);
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
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CreateTweet
                  addTweet={addTweet}
                  onAdd={postTweet}
                  isLoading={isLoading}
                />
                <TweetList tweets={tweets} isLoading={isLoading} />
              </>
            }
          ></Route>
          <Route path="/profile" element={<Profile tweets={tweets}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
