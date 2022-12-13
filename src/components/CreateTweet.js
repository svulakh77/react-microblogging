import React, { useContext, useState,useEffect } from "react";
import { nanoid } from "nanoid";
// import axios from "axios";
import SomeContext from "../Context.js";
import { collection, addDoc, getDocs} from "firebase/firestore";
import {db} from '../firebase';


   

function CreateTweet() {
  const {tweets,setTweets, addTweet,userName,uname} = useContext(SomeContext);
   const collect = collection(db, "tweets");
  const tweetDate = new Date();
  const addNewTweet = async (e) => {
    e.preventDefault();  
   
    try {      
        const idTweet = await addDoc(collect, {
          userName:userName,
          date: tweetDate.toISOString(),
      content: text,
      id: nanoid(),  
        });
        const newArray = [idTweet, ...tweets];
        setTweets(newArray);
        console.log("Document written with ID: ", idTweet.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

  const fetchTweet = async () => {
       
    await getDocs(collection(db, "tweets"))
        .then((querySnapshot)=>{               
            const newTweetData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setTweets(newTweetData.sort((a,b) => new Date (b.date) - new Date (a.date)));                
            console.log("new tweetdata", newTweetData);
        })
   
}

useEffect(()=>{
    fetchTweet();
}, [])

  const [text, setText] = useState("");
  const handleTweet = (e) => {
    setText(e.target.value);
  };

 
  // // const printTweet = (e) => {
  // //   e.preventDefault();
  // //   const newTweet = {
  // //     date: tweetDate.toISOString(),
  // //     content: text,
  // //     userName: userName,
  // //     id: nanoid(),
  // //   };
    

  //   if (text.length > 0) {
  //     addTweet(newTweet);
  //     setText("");
  //   }
  // };
  return (
    <div className="tweetContainer">
      <form className="textContainer">
        <div className="enterTweet">
          <textarea
            className="textarea"
            onChange={handleTweet}
            placeholder="What you have in mind..."
          />
          {text.length >= 140 && (
            <span class="w3-panel w3-pale-red w3-border">
              The tweet can't contain more than 140 chars
            </span>
          )}
          <button
            className="tweetButton"
            onClick={addNewTweet }
            type="submit"
            disabled={text.length >= 140 ? true : false}
          
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTweet;
