import React from "react";
import { Link } from "react-router-dom";

const NotAuthNavbar = () => {
  return (
    <nav>
      <div className="nav">
        <Link className="link" to={"/signup"}>
          Sign Up
        </Link>
        <Link className="link" to={"/login"}>
          Log In
        </Link>
      </div>
    </nav>
  );
};

export default NotAuthNavbar;
