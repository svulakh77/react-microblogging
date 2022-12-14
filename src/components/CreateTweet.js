import React, { useContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";
// import axios from "axios";
import SomeContext from "../Context.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth,upload } from "../firebase.js";

function CreateTweet() {
  const { tweets, setTweets, addTweet, userName, isLoading, setIsLoading } =
    useContext(SomeContext);
    const currentUser=useAuth();
    console.log(currentUser)

    setIsLoading(false)
  const collect = collection(db, "tweets");
  const tweetDate = new Date();
  const addNewTweet = async (e) => {
    setIsLoading(true)
    e.preventDefault();

    try {
      const tweetTweet = {
        userName: currentUser.email,
        date: tweetDate.toISOString(),
        content: text,
        id: nanoid(),
      }
      const idTweet = await addDoc(collect, tweetTweet);
      const newArray = [tweetTweet, ...tweets];
      setTweets(newArray);
      setIsLoading(false)
      console.log("Document written with ID: ", idTweet.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsLoading(false)
    }
  };

  const fetchTweet = async () => {
    setIsLoading(true)
    await getDocs(collection(db, "tweets")).then((querySnapshot) => {
      const newTweetData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTweets(
        newTweetData.sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      console.log("new tweetdata", newTweetData);
    });
  };

  useEffect(() => {
    fetchTweet();
  }, []);

  const [text, setText] = useState("");
  const handleTweet = (e) => {
    setText(e.target.value);
  };


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
            onClick={addNewTweet}
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
