import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function GoToDashBoardPage(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;

        if (uid === "VIpIpfo6vtS8jDDSGG9frvtHEJ62" || uid === "CO71Tobh4bV3fpPMPcy6zlhVCV42") {
          navigate("/dashboard");
        } else {
          // Redirect to a different page for other users
          navigate("/not-authorized");
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert("Email or password is wrong");
      });
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-image">
        <div className="card" style={{ width: "600px" }}>
          <div className="card-body">
            <h5 className="card-title md-5 text-center">LOGIN</h5>
            <hr />
            <form id="loginForm" noValidate>
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
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid email address.
                </div>
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
                  required
                />
                <div className="invalid-feedback">Please enter a password.</div>
              </div>
              <button
                type="submit"
                className="btn btn-outline-success"
                onClick={GoToDashBoardPage}
              >
                Sign In
              </button>
              <div className="text-center"><Link to="#">Forgot Password?</Link></div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
