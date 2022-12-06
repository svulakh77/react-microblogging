import React from "react"; 
import Tweet from "./Tweet.js";

const TweetList = ({tweets}) =>{
    return(
        <div className="tweetList">
            {tweets.map((tweet)=>{
                return(
                        <Tweet
                        tweet={tweet} key={tweet.id}
                        />
                )
            })}
           

        </div>
    )

}
export default TweetList;