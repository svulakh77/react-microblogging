import React from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import axios from "axios";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import SomeContext from "../Context.js";
import { useContext } from "react";


const Navbar = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(SomeContext);

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log("user signed out");
        setCurrentUser(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav>
      <div className="nav">
        <Link className="link" to={"/"}>
          Home
        </Link>
        <Link className="link" to={"/profile"}>
          Profile
        </Link>
        <Link className="link" onClick={logout}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
