import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import Input from '../components/Input.js';
import Button from '../components/Button.js';

function Login(props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="Login">
      <div className="mx-auto card" style={{ margin: "40px", maxWidth: "230px", backgroundColor: "#71cae3", borderRadius: "10px" }}>

        <div style={{ margin: "20px 20px 0px 20px" }}>

          <h2 style={{ color: "white" }}>Common.GG</h2>
          <div className="form-group" >
            <Input type="email"
              placeholder="Email"
              track={setEmail} />
          </div>

          <div className="form-group">

            <Input type="password"
              placeholder="Password"
              track={setPassword} />

          </div>
          <div className="row">
            <a href="" style={{ color: "white" }}>
              <p className="col">
                Forgot Password?</p>
            </a>
            <a href="/SignUp" style={{ color: "white" }}>
              <p className="col">
                New User? Sign Up Here!</p>
            </a>
          </div>
          <button type="submit" className="btn btn-outline-light"
            onClick={() => props.signInUser(email.current.value, password.current.value)} style={{ marginBottom: "20px" }}>
            Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;
