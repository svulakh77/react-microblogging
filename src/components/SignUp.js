import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import "../App.css";

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (userInfo.password === userInfo.repassword) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userInfo.email,
          userInfo.password
        );
        const newUser = {
          userName: userInfo.userName,
          email: userInfo.email,
          password: userInfo.password,
        };
        console.log("added user")
        await setDoc(doc(db, "users", userCredential.user.uid), newUser);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }

    setUserInfo({ userName: "", email: "", password: "", repassword: "" });
  };

  return (
    <form className="userForm">
      <h1>Sign Up</h1>
      <label htmlFor="name">Name</label>
      <input
        onChange={handleChange}
        value={userInfo.userName}
        type="text"
        id="userName"
        className="loginInput"
      />
      <label htmlFor="email">Email</label>
      <input
        onChange={handleChange}
        value={userInfo.email}
        type="text"
        id="email"
        className="loginInput"
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={handleChange}
        value={userInfo.password}
        type="text"
        id="password"
        className="loginInput"
      />
      <label htmlFor="repassword">Re-Password</label>
      <input
        onChange={handleChange}
        value={userInfo.repassword}
        type="text"
        id="repassword"
        className="loginInput"
      />
      <button className="btn-submit" onClick={handleSignUp}>
        Sign Up
      </button>
    </form>
  );
}
