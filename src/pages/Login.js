import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from "../images/icons/logo1light.png";
import arrow from "../images/icons/arrow-right.png";
import Input from '../components/Input.js';

function Login(props) {

  const [loginIsSuccessful, setLoginIsSuccessful] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const logoCSS = {
    /* logo1light 1 */
    width: "4.5rem",
    height: "auto",
    marginBottom: "20px"
  }

  const linkStyle = {
    color: "#BF9AFC",
    textDecoration: "underline",
    top: "-12rem",
  }

  useEffect(() => {
    setLoginIsSuccessful(null);
  }, [])

  function handleMessagingForUnsuccessfulSignIn() {
    if (loginIsSuccessful === null || loginIsSuccessful === true) {
      return (<div></div>);
    }
    else if (loginIsSuccessful === false) {
      return (<p style={{ color: "#F34D4D" }}>There was an error when attempting to login.
            Please double check that your username and password are correct, and try again</p>);
    }
  }

  const inputStyle = {
    backgroundColor: "transparent #292833",
    color: "#BF9AFC",
    border: "solid",
    borderColor: "#BF9AFC",
    borderWidth: "1px",
    borderRadius: "2px",
    backgroundColor: "#292833",
    padding: "0.3rem",
    margin: "3%",
    width: "100%",
    height: "77%",
    marginLeft: "0rem"
  }

  function handleSignIn(e) {
    if (e.key === "Enter") {
      props.signInUser(email.current.value, password.current.value, setLoginIsSuccessful);
    }
  }

  return (
    <div className="Login">
      <div className="mx-auto card text-center"
        style={{
          margin: "200px",
          maxWidth: "20%",
          backgroundColor: "#292833",
          borderRadius: "10px",
          boxShadow: "-1px 7px 25px 1px #171421",
        }}>
        <div style={{ margin: "20px 20px 0px 20px" }}>
          {handleMessagingForUnsuccessfulSignIn()}
          <div className="row mx-auto">
            <div className="col-12 mx-auto" style={{ textAlign: "center", }}>
              <img style={logoCSS} src={logo} />
              <div style={{ pointerEvents: "none" }}></div>
            </div>
            <br />
            <div className="form-group col-12" style={{ textAlign: "center", }}>
              <p style={{ position: "relative", color: "#BF9AFC", textAlign: "center" }}> The Social Network for Gaming </p>
              <div className="row mx-auto">
                <div className="Input mx-auto" >
                  <div onKeyPress={(e) => handleSignIn(e)}>
                    <Input type="email"
                      bootstrap="border-0"
                      placeholder="email"
                      track={setEmail}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-12" style={{ textAlign: "center", }} >
            <div className="row mx-auto">
              <div className="Input mx-auto" >
                <div onKeyPress={(e) => handleSignIn(e)}>
                  <Input type="password"
                    bootstrap="border-0"
                    placeholder="password"
                    track={setPassword}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

          </div>
          <div className="row col-12">
            <div className="col-5" style={{ marginRight: "3%" }}></div>
            <div className="form-group">
              <button type="submit" className="btn"
                onClick={() => { props.signInUser(email.current.value, password.current.value, setLoginIsSuccessful) }} style={{
                  marginBottom: "20px",
                  marginTop: "14px",
                  marginRight: "2.5%",
                  backgroundColor: "transparent",
                  color: "#BF9AFC",
                  padding: "0.4rem",
                  paddingRight: "1rem",
                  paddingLeft: "1rem",
                  border: "solid",
                  borderRadius: "10px",
                  borderColor: "#BF9AFC",
                  borderWidth: "2px",
                }}>
                <img src={arrow} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="text-center col-4">
          <Link to="/signup" style={{
            position: "relative",
            padding: '.3rem',
            lineHeight: "0.5rem",
            top: "-11.25rem",
            color: "#BF9AFC",
            textDecoration: "underline",
          }}>
            <p className="col">
              New? Sign Up
              </p>
          </Link>
          <Link to="/forgotpassword">
            <p className="col" style={linkStyle}>
              Forgot Password?
              </p>
          </Link>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default Login;
