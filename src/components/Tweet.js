import React from "react";
import { useState, useEffect } from "react";

const Tweet = ({ tweet }) => {
  console.log("bro");

  return (
    <div className="tweetBox">
      <div className="tweetTop">
        <h6 className="tweetInfo userName">svulakh</h6>
        <h6 className="tweetInfo tweetDate">{tweet.date}</h6>
      </div>
      <div className="tweetInfo tweetText">{tweet.text}</div>
    </div>
  );
};
export default Tweet;
