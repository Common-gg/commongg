import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import Input from '../components/Input.js';
import Button from '../components/Button.js';
import logo from "../images/logo1light.png";
import arrow from "../images/arrow-right.png";

function Login(props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const logoCSS = {
    /* logo1light 1 */
    width: "100px",
    height: "99.01px",
    left: "393px",
    top: "179px"
  }

  return (
    <div className="Login">
      <div className="mx-auto card" style={{
        margin: "40px",
        maxWidth: "500px",
        backgroundColor: "#292823",
        borderRadius: "10px",
        boxShadow: "-1px 10px 250px 1px #171421"
      }}>

        <div style={{ margin: "20px 20px 0px 20px" }} >
          <div className="row">
            <div className="col-4"></div>
            <div className="row">
              <div className="col-3"></div>
              <img src={logo} style={logoCSS} />
              <div className="col-4"></div>
              <br />
            </div></div>

          <div className="form-group" >
            <div className="row">
              <div className="col-4"></div>
              <div className="row">
                <Input type="email"
                  style= {{
                    backgroundColor: "#292823",
                  }}
                  bootstrap="border border-secondary"
                  placeholder="Email"
                  track={setEmail} />
                <div className="col-4"></div>
              </div></div></div>

          <div className="form-group">
            <div className="row">
              <div className="col-4"></div>
              <div className="row">
                <Input type="password"
                  style={{
                    backgroundColor: "#292823",
                  }}
                  bootstrap="border border-secondary"
                  placeholder="Password"
                  track={setPassword} />
                <div className="col-4"></div>
              </div></div></div>

          <div className="row">
            <div className="col-4"></div>
            <div className="row">
              <div className="col-6"></div>
              <button type="submit" className="btn btn-outline-light" onClick={() => props.signInUser(email.current.value, password.current.value)}
                style={{
                  marginBottom: "10px",
                  backgroundColor: "transparent"
                }}>
                <img src={arrow} />
              </button>
              <div className="col-4"></div>
            </div></div></div></div>

      <div className="row">
        <div className="col-4"></div>
        <div className="text-center col-4">
          <Link to="/signup">
            <p className="col" style={{ color: "#BF9AFC" }}>
              New? Sign up
              </p>
          </Link>

          <a href="" style={{ color: "#BF9AFC" }}>
            <p className="col">
              Forgot Password?</p>
          </a>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default Login;
