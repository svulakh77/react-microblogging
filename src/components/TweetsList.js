import React from "react"; 
import Tweet from "./Tweet.js";
import LoadingSpinner from "./LoadingSpinner.js";

const TweetList = ({tweets, isLoading}) =>{
    return(
        <div className="tweetList">
            {isLoading ? <LoadingSpinner /> : ""}
            {tweets.map((tweet)=>{
                return(
                    
                        <Tweet
                        tweet={tweet} key={tweet.id} isLoading={isLoading}
                        />
                )
            })}
           

        </div>
    )

}
export default TweetList;