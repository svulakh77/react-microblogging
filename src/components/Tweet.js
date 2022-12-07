import React from "react";
import { useState, useEffect } from "react";

const Tweet = ({ tweet }) => {
  console.log("bro");

  return (
      <div className="tweetBox">
        {console.log(tweet)}
      <div className="tweetTop">
        <h6 className="tweetInfo userName">{tweet.userName}</h6>
        <h6 className="tweetInfo tweetDate">{tweet.date}</h6>
      </div>
      <div className="tweetInfo tweetText">{tweet.content}</div>
    </div>
  );
};
export default Tweet;
