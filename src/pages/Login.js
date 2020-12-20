import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../images/icons/logo1light.png";
import arrow from "../images/icons/arrow-right.png";

function Login(props) {

  const emailRef = useRef();
  const passwordRef = useRef();

  const logoCSS = {
    /* logo1light 1 */
    width: "100px",
    height: "99.01px",
    left: "393px",
    top: "179px"
  }

  function handleSignIn(e) {
    if (e.key === "Enter") {
      props.signInUser(emailRef.current.value, passwordRef.current.value);
    }
  }

  return (
    <div className="Login">
      <div className="mx-auto card" style={{
        margin: "40px",
        maxWidth: "230px",
        backgroundColor: "#292833",
        borderRadius: "10px",
        boxShadow: "-1px 10px 250px 1px #171421"
      }}>

        <div style={{ margin: "20px 20px 0px 20px" }} className="row">
          <div className="row">
            <div className="col-4"></div>
            <img src={logo} style={logoCSS} />
            <div className="col-4"></div>
            <br />
          </div>
          <div className="form-group" >
            <div className="Input" >
              <input className="border border-secondary" type="email"
                placeholder="Email" ref={emailRef}
                onKeyPress={(e) => handleSignIn(e)} />
            </div>
          </div>
          <div className="form-group" >
            <div className="Input" >
              <input className="border border-secondary" type="Password"
                placeholder="Password" ref={passwordRef}
                onKeyPress={(e) => handleSignIn(e)} />
            </div>
          </div>
          <div className="col-4"></div>
          <button type="submit" className="btn btn-outline-light"
            onClick={() => props.signInUser(emailRef.current.value, passwordRef.current.value)} style={{ 
              marginBottom: "20px",
              backgroundColor: "transparent",
              color: "#BF9AFC",
              border: "solid",
              borderRadius: "10px",
              borderColor: "#BF9AFC",
              borderWidth: "2px" }}>
            <img src={arrow} />
          </button>
          <div className="col-4"></div>
        </div>
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="text-center col-4">
          <Link to="/signup">
            <p className="col" style={{ color: "#BF9AFC" }}>
              New? Sign up
              </p>
          </Link>
          <br />
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
