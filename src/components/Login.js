import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import SomeContext from "../Context";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(SomeContext);

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        setCurrentUser(userCredential.user.uid);
        localStorage.setItem(
          "currentUser",
          JSON.stringify(userCredential.user.uid)
        );
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="userForm">
      <h1>Log In</h1>
      <label htmlFor="email">Email</label>
      <input
      className="loginInput"
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        id="email"
      />
      <label htmlFor="password">Password</label>
      <input
      className="loginInput"
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        id="password"
      />
      <button className="btn-submit" onClick={handleLogIn}>
        Log In
      </button>
      <Link className="link" to="/signup">
        Not a member? Sign up
      </Link>
    </form>
  );
}
