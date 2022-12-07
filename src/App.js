import "./App.css";
import React, { useState } from "react";
import CreateTweet from "./components/CreateTweet.js";
import TweetList from "./components/TweetsList.js";
import { useEffect } from "react";
import axios from 'axios'

// import DataFetching from "./components/DataFetching.js";

function App() {
  const [tweets, setTweets] = useState([]);
  const addTweet = (newTweet) => {
    console.log(newTweet);
    const newArray = [newTweet, ...tweets];
    setTweets(newArray);
  };
  
  async function fetchData (){
    try{
    const response = await axios.get('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet')
    console.log(response)
    setTweets(response.data.tweets)
}catch (error){
        console.log (error)
     }
      }
      useEffect(()=>{
      fetchData()
      },[])
 const postTweet=(tweetData)=>{
  console.log("hi")
  axios.post('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',tweetData).then(fetchData);
 }

 
      
 
  return (
    <div className="appContainer">
      <CreateTweet addTweet={addTweet} onAdd = {postTweet}/>
      <TweetList tweets={tweets}/>
      {/* <DataFetching tweets={tweets} setTweets={setTweets}/> */}
    </div>
  );
}

export default App;
