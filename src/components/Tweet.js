import React from "react";
import LoadingSpinner from "./LoadingSpinner.js";


const Tweet = ({ tweet, isLoading }) => {

  return (
   
    <div className="tweetBox">
          <div className="tweetTop">
              <h6 className="tweetInfo userName">{tweet.userName}</h6>
              <h6 className="tweetInfo tweetDate">{tweet.date}</h6>
          </div>
          <div className="tweetInfo tweetText">{tweet.content}</div>
      </div>
  );
};
export default Tweet;
