import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Alert } from "react-bootstrap";

function CreateTweet({ addTweet }) {
  const [text, setText] = useState("");
  const handleTweet = (e) => {
    setText(e.target.value);
  };

  const tweetDate = new Date();

  const printTweet = (e) => {
    console.log("printed");
    e.preventDefault();
    const newTweet = {
      date: tweetDate.toISOString(),
      text: text,
      id: nanoid(),
    };
    if (text.length > 0) {
      addTweet(newTweet);
      setText("");
    }
  };
  return (
    <div className="tweetContainer">
      <form>
        <div className="enterTweet">
          <textarea
            className="textarea"
            onChange={handleTweet}
            placeholder="What you have in mind..."
          />

          {/* {(text.length >= 140) ? <span><span/>:<span></span>  } */}
          {text.length >= 140 && (
            <span>The tweet can't contain more than 140 chars</span>
          )}
          <span>{text.length}/140</span>
          <button
            className="tweetButton"
            onClick={printTweet}
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
