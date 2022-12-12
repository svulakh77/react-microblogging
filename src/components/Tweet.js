import React, { useContext } from "react";
import SomeContext from "../Context.js";


const Tweet = ({tweet}) => {
  return (
   
    <div className="tweetBox">
          <div className="tweetTop">
              <div className="tweetInfo userName">{tweet.userName}</div>
              <div className="tweetInfo tweetDate">{tweet.date}</div>
          </div>
          <div className="tweetInfo tweetText">{tweet.content}</div>
      </div>
  );
};
export default Tweet;
