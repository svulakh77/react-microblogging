import "./App.css";
import React, { createContext, useState } from "react";
import CreateTweet from "./components/CreateTweet.js";
import TweetList from "./components/TweetsList.js";
import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile.js";
import SomeContext from "./Context.js";

function App() {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTweet = (newTweet) => {
    setIsLoading(true);
    const newArray = [newTweet, ...tweets];
    setTweets((prevTweets) => [newTweet, ...prevTweets]);
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
    const interval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);
   
  const postTweet = (tweetData) => {
    axios
      .post(
        "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet",
        tweetData
      )
      .then(fetchData);
  };
  const [newUserName, setNewUserName] = useState([]);
  const [userName, setUserName] = useState();
  const temp = localStorage.getItem("userName") || "sv";

  const uname = () => {
    setUserName(temp);
  };

  const handleUserNameInput = (e) => {
    e.preventDefault();
    setNewUserName(e.target.value);
  };
  const handleNewUserName = (e) => {
    e.preventDefault();
    if (newUserName.length > 0) {
      addUserName();
    }
  };
  const addUserName = () => {
    console.log(newUserName);
    setUserName(newUserName);
  };
  useEffect(() => {
    localStorage.setItem("userName", JSON.stringify(userName));
  }, [userName]);

  
  return (
    <SomeContext.Provider
      value={{
        tweets,
        addTweet,
        postTweet,
        isLoading,
        setIsLoading,
        handleNewUserName,
        handleUserNameInput,
        newUserName,
        userName,
        uname,
      }}
    >
      <div className="appContainer">
        <Router>
          <nav className="nav">
            <Link classname="link" to="/">
              Home
            </Link>
            <Link classname="link" to="/profile">
              Profile
            </Link>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <CreateTweet />
                  <TweetList />
                </>
              }
            ></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </Router>
      </div>
    </SomeContext.Provider>
  );
}

export default App;
