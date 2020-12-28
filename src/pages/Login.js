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

  const inputStyle = {
    backgroundColor: "transparent #292833",
    color: "#BF9AFC",
    border: "solid",
    borderColor: "#BF9AFC",
    backgroundColor: "#292833",
  }

  return (
    <div className="Login">
      <div className="mx-auto card" style={{
        margin: "150px",
        maxWidth: "410px",
        backgroundColor: "#292833",
        borderRadius: "10px",
        boxShadow: "-1px 10px 250px 1px #171421"
      }}>

        <div style={{ margin: "20px 20px 0px 20px" }} className="row">
          <div className="col-4"></div>
          <img src={logo} style={logoCSS} />
          <div className="col-5" style={{ pointerEvents: "none" }}></div>
          <br />
          <div className="form-group" >
            <div className="row">
              <div className="col-6"></div>
              <div className="row">
                <div className="col-6"></div>
                <div className="row">
                  <div className="col-6"></div>
                  <div className="row">
                    <div className="col-4"></div>
                    <div className="Input" >
                      <br />
                      <input style={inputStyle} className="border border-secondary" type="email"
                        placeholder="email" ref={emailRef}
                        onKeyPress={(e) => handleSignIn(e)} />
                    </div></div></div></div></div>
          </div>
          <div className="form-group" >
            <div className="row">
              <div className="col-1"></div>
              <div className="row">
                <div className="col-1"></div>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="row">
                    <div className="col-1"></div>
                    <div className="row">
                      <div className="col-1"></div>
                      <div className="row">
                        <div className="col-1"></div>
                        <div className="Input" >
                          <input style={inputStyle} className="border border-secondary" type="Password"
                            placeholder="password" ref={passwordRef}
                            onKeyPress={(e) => handleSignIn(e)} />
                        </div></div></div></div></div></div></div>
          </div>
          <div className="row col-12">
            <div className="col-5"></div>
            <div className="form-group">
              <button type="submit" className="btn btn-outline-light"
                onClick={() => props.signInUser(emailRef.current.value, passwordRef.current.value)} style={{
                  marginBottom: "20px",
                  backgroundColor: "transparent",
                  color: "#BF9AFC",
                  border: "solid",
                  borderRadius: "10px",
                  borderColor: "#BF9AFC",
                  borderWidth: "2px",
                }}>
                <img src={arrow} />
              </button>
            </div></div></div>
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="text-center col-4">
          <Link to="/signup">
            <p className="col" style={{ color: "#BF9AFC", textDecoration: "underline" }}>
              new? sign up
              </p>
          </Link>
          <a href="" style={{ color: "#BF9AFC", textDecoration: "underline" }}>
            <p className="col">
              forgot password?</p>
          </a>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default Login;
