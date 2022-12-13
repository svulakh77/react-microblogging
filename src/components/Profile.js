import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import SomeContext from "../Context.js";
import { useAuth } from "./User.js";

function Profile() {
  const {
    handleNewUserName,
    handleUserNameInput,
    newUserName,
    user,
    isLoading,
  } = useContext(SomeContext);
  // const {upload} = useAuth();
  // const [photoURL,setPhotoURL] = useState('avataaars.svg');
  // const [photo,setPhoto] = useState(null);
  // const handlePic = (e)=>{
  //   if (e.target.files[0]){
  //     setPhoto(e.target.files[0]);
  //   }
  // }
  //   const handleClick = () =>{
  //     upload(photo,user);
  //   }
  //   useEffect(()=>{
  //     if(user&&user.photoURL){
  //       setPhotoURL(user.photoURL);
  //     }
  //   },[user])

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
      {/* <div className="picFile">
          <input type ={'file'} onChange={handlePic}></input>
          <Button onClick={handleClick}></Button>
        </div> */}
    </div>
  );
}

export default Profile;
