import "./App.css";
import React, { createContext, useState } from "react";
import CreateTweet from "./components/CreateTweet.js";
import TweetList from "./components/TweetsList.js";
import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile.js";
import { useNavigate, useParams } from "react-router-dom";
import SomeContext from "./Context.js";


function App() {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const addTweet = (newTweet) => {
    setIsLoading(true);
    const newArray = [newTweet, ...tweets];
    setTweets((prevTweets)=>[newTweet, ...prevTweets]);
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
    <SomeContext.Provider value={{tweets, addTweet, postTweet, isLoading,setIsLoading}}>
    <div className="appContainer">
      <Router>
        <nav className="nav">
          <Link classname="link" to="/">Home</Link>
          <Link classname="link" to="/profile">Profile</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CreateTweet/>
                <TweetList/>
              </>
            }
          ></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
      </Router>
    </div>
    </SomeContext.Provider>
   
  );
}

export default App;
