import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import SomeContext from "../Context.js";
import { useAuth,upload } from "../firebase.js";

function Profile() {
  const {
    handleNewUserName,
    handleUserNameInput,
    newUserName,
    user,
    isLoading,
    setIsLoading,
  } = useContext(SomeContext);
  const currentUser=useAuth();
  // const {upload} = useAuth();
  const [photoURL,setPhotoURL] = useState("https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=is&k=20&c=PJjJWl0njGyow3AefY7KVNuhkbw5r2skqFiCFM5kyic=");
  const [photo,setPhoto] = useState(null);
  const handlePic = (e)=>{
    if (e.target.files[0]){
      setPhoto(e.target.files[0]);
    }
  }
    const handleClick = () =>{
      upload(photo,currentUser, setIsLoading);
    }
    useEffect(()=>{
      if(currentUser && currentUser?.photoURL){
        setPhotoURL(currentUser.photoURL);
      }
    },[currentUser])

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="picContainer">
        {/* <img src={photoURL} alt ='avatar'className="avatar-pic"></img> */}
      </div>
      <h3>User Name</h3>
      {/* <div>{user.displayName}</div> */}
      <form className="profileForm" onSubmit={handleNewUserName}>
        <input
          className="loginInput"
          onChange={handleUserNameInput}
          value={newUserName}
        />
        <button className="profileButton" type="submit">
          Save
        </button>
      </form>
      <div className="picFile">
          <input type ='file' onChange={handlePic}></input>
          <button disabled={isLoading||!photo} onClick={handleClick}>Upload</button>
          <img height="30px" width="30px" src={photoURL} alt="Avatar"className="avatar"></img>
        </div>
    </div>
  );
}

export default Profile;
