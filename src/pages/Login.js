import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from "../images/icons/logo1light.png";
import arrow from "../images/icons/arrow-right.png";

function Login(props) {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [loginIsSuccessful, setLoginIsSuccessful] = useState();

  const logoCSS = {
    /* logo1light 1 */
    width: "6.5rem",
    height: "auto",
  }

  const linkStyle = {
    color: "#BF9AFC",
    textDecoration: "underline"
  }

  useEffect(() => {
    setLoginIsSuccessful(null);
  }, [])

  function handleSignIn(e) {
    if (e.key === "Enter") {
      props.signInUser(emailRef.current.value, passwordRef.current.value, setLoginIsSuccessful);
    }
  }

  function handleMessagingForUnsuccessfulSignIn() {
    if (loginIsSuccessful === null || loginIsSuccessful === true) {
      return (<div></div>);
    }
    else if (loginIsSuccessful === false) {
      return (<p style={{ color: "red" }}>there was an error when attempting to login.
            please double check that your username and password are correct, and try again</p>);
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
      <div className="mx-auto card"
        style={{
          margin: "150px",
          maxWidth: "410px",
          backgroundColor: "#292833",
          borderRadius: "10px",
          boxShadow: "-1px 7px 150px 1px #171421"
        }}>
        <div style={{ margin: "20px 20px 0px 20px" }}>
          {handleMessagingForUnsuccessfulSignIn()}
          <div className="row">
            <div className="col-4" style={{ marginRight: "2.5%" }}></div>
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
                      </div></div></div></div></div></div> </div>
          <div className="form-group" >
            <div className="row col-12">
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
          <div className="row col-12">
            <div className="col-5"></div>
            <div className="form-group">
              <button type="submit" className="btn btn-outline-light"
                onClick={() => props.signInUser(emailRef.current.value, passwordRef.current.value, setLoginIsSuccessful)} style={{
                  marginBottom: "20px",
                  marginRight: "2.5%",
                  backgroundColor: "transparent",
                  color: "#BF9AFC",
                  border: "solid",
                  borderRadius: "10px",
                  borderColor: "#BF9AFC",
                  borderWidth: "2px"
                }}>
                <img src={arrow} />
              </button>
            </div></div></div>
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="text-center col-4">
          <Link to="/signup" style={{ position: "relative", padding: '.3rem', lineHeight: "0.5rem", }}>
            <p className="col" style={linkStyle}>
              new? sign up
              </p>
          </Link>
          <Link to="/forgotpassword">
            <p className="col" style={linkStyle}>
              forgot password?
              </p>
          </Link>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default Login;
