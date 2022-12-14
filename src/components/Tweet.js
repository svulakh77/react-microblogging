import React, {useState,useEffect} from "react";
import { getDoc,doc } from "firebase/firestore";
import { db } from "../firebase.js";
import { set } from "firebase/database";





const Tweet = ({tweet}) => {
  const [tweetUserName,setTweetUserName]=useState('')
  console.log(tweet)
  const fetchUser = async () => {
    const userId = doc(db, "users", tweet.id)
    await getDoc(userId).then((querySnapshot) => {
        setTweetUserName( querySnapshot.data().userName )
      })
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
   
    <div className="tweetBox">
          <div className="tweetTop">
              <div className="tweetInfo userName">{tweetUserName}</div>
              <div className="tweetInfo tweetDate">{tweet.date}</div>
          </div>
          <div className="tweetInfo tweetText">{tweet.content}</div>
      </div>
  );
};
export default Tweet;
