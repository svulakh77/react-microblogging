import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, useAuth } from "../firebase.js";
import SomeContext from "../Context";
import  signInWithGoogle  from '../firebase.js';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUser=useAuth();
//   const GoogleLogin = () => {
//     return (
//       <div>
//         <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
//       </div>
//     )
//   }

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
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
  const googleClickHanlder = (e)=>{
    e.preventDefault()
    signInWithGoogle()
    navigate("/");
  }

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
      <button className="button" onClick={googleClickHanlder}><i className="fab fa-google"></i>Sign in with google</button>
     
      <Link className="link" to="/signup">
        Not a member? Sign up
      </Link>
    </form>
  );
}
