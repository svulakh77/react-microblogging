import "./App.css";
import React, { useState } from "react";
import CreateTweet from "./components/CreateTweet.js";
import TweetList from "./components/TweetsList.js";
import { useEffect } from "react";
import axios from "axios";
import {  Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile.js";
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import SomeContext from "./Context.js";
import PrivateRoute from "./components/PrivateRoute.js";
import HomePage from "./components/HomePage.js";
import { signOut } from "firebase/auth";
import { auth,db } from "./firebase.js";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import Navbar from "./components/NavBar.js";
import NotAuthNavbar from "./components/NotAuthNavBar.js";
// import { collection, getDocs } from "firebase/firestore";


function App() {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || false);
  const navigate = useNavigate();

  

  const clickLogin = () => {
    if (currentUser) {
      signOut(auth);
    } else {
      navigate("/login");
    }
  };
  const clickSignup = () => {
    navigate("/signup");
  };
  // const addTweet = (newTweet) => {
  //   setIsLoading(true);
  //   const newArray = [newTweet, ...tweets];
  //   setTweets((prevTweets) => [newTweet, ...prevTweets]);
  //   setIsLoading(false);
  // };



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
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);
   
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

  // useEffect(() => {
  //   if (currentUser) {
  //     const starCountRef = ref(db, "users/" + currentUser.uid);
  //     onValue(starCountRef, (snapshot) => {
  //       if (snapshot.exists()) {
  //         let data = snapshot.val();
  //         setUserName(data.firstName + " " + data.lastName);
  //       }
  //     });
  //   }
  // }, [currentUser]);
  // const temp = localStorage.getItem("userName") || "sv";

  // const uname = () => {
  //   setUserName(temp);
  // };

  // const handleUserNameInput = (e) => {
  //   e.preventDefault();
  //   setNewUserName(e.target.value);
  // };
  // const handleNewUserName = (e) => {
  //   e.preventDefault();
  //   if (newUserName.length > 0) {
  //     addUserName();
  //   }
  // };
  // const addUserName = () => {
  //   console.log(newUserName);
  //   setUserName(newUserName);
  // };
  // useEffect(() => {
  //   localStorage.setItem("userName", JSON.stringify(userName));
  // }, [userName]);

  
  return (
    <SomeContext.Provider
      value={{
        setCurrentUser,
        tweets,
        setTweets,
        // addTweet,
        postTweet,
        isLoading,
        setIsLoading,
        // handleNewUserName,
        // handleUserNameInput,
        newUserName,
        userName,
        // uname,
      }}
    >
      <div className="appContainer">
      {currentUser ? <Navbar /> : <NotAuthNavbar />}
          <Routes>
          <Route
          path='/'
          element={
            <PrivateRoute currentUser={currentUser}>
              <HomePage />
            </PrivateRoute>
          }
        ></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
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
    
      </div>
    </SomeContext.Provider>
  );
}

export default App;
