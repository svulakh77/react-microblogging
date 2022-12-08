import React, { useState,useEffect,useContext } from 'react'
import SomeContext from '../Context.js';

function Profile() {

  const[newUserName,setNewUserName]=useState([]);
  const [userName,setUserName]=useState();
 
  const handleUserNameInput = (e) => {
    e.preventDefault();
    setNewUserName(e.target.value);
  };
const handleNewUserName=(e)=>{
  e.preventDefault();
  if (newUserName.length>0) {
    addUserName()
  }
}
const addUserName=()=>{
  console.log(newUserName)
  setUserName(newUserName)
}
  useEffect(() => {
      localStorage.setItem("userName", JSON.stringify(userName)); 
  }, [userName]);
  return (
    <div className='profile'>
      <h1>Profile</h1>
      <h3>User Name</h3>
      <form onSubmit={handleNewUserName}>
        <input onChange={handleUserNameInput} value={newUserName}/>
        <button type="submit">Save</button>
      </form>
     
    </div>
  )
}

export default Profile