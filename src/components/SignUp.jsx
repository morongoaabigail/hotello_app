import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function Register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Successfully registered!");
        console.log("successfully logged in")
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className="centered-form bg-image">
      <div className="card" style={{ width: "600px" }}>
        <div className="card-body">
          <h4 className="card-title">SIGN UP</h4>
          <hr />
          <form>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-success"
              onClick={Register}
            >
              Sign Up
            </button>
            
      <div className="text-center">

      <Link>Forgot Password?</Link> <br />
            <Link to="/login">Already have an account? Login!</Link>
      </div>
       
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
