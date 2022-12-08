import React, {useContext} from "react"; 
import Tweet from "./Tweet.js";
import LoadingSpinner from "./LoadingSpinner.js";
import SomeContext from "../Context.js";

const TweetList = () =>{
    const {tweets,isLoading}= useContext(SomeContext);
    return(
        <div className="tweetList">
            {isLoading ? <LoadingSpinner /> : ""}
            {tweets.map((tweet)=>{
                return(
                    
                        <Tweet tweet={tweet}/>
                )
            })}
           

        </div>
    )

}
export default TweetList;