import React, { useState,useEffect,useContext } from 'react'
import SomeContext from '../Context.js';

function Profile() {
const {handleNewUserName,handleUserNameInput,newUserName} = useContext(SomeContext)
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