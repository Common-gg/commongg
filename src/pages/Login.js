import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from "../images/icons/logo1light.png";
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
    position: "relative",
    padding: '.3rem',
    color: "#FFFFFF",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "18px"
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
    backgroundColor: "transparent #2A2A2D",
    color: "#BF9AFC",
    border: "solid",
    borderColor: "#BF9AFC",
    borderWidth: "1px",
    borderRadius: "2px",
    backgroundColor: "#2A2A2D",
    padding: "0.3rem",
    margin: "3%",
    width: "100%",
    height: "77%",
    marginLeft: "0rem",
    fontSize: "18px"
  }

  const loginButtonStyle = {
      backgroundColor: "#BF9AFC",
      color: "#2A2A2D",
      border: "solid",
      borderRadius: "10px",
      borderColor: "#BF9AFC",
      borderWidth: "2px",
      padding: "1rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      position: "relative",
      marginTop: "0.5rem",
      marginRight: "0"
  }

  function handleSignIn(e) {
    if (e.key === "Enter") {
      props.signInUser(email.current.value, password.current.value, setLoginIsSuccessful);
    }
  }

  return (
    <div className="Login">
      <div style={{ margin: "20px 20px 0px 20px" }}>
        {handleMessagingForUnsuccessfulSignIn()}
        <div className="row mx-auto">
          <div className="col-12 mx-auto" style={{ textAlign: "center", }}>
            <img style={logoCSS} src={logo} />
            <div style={{ pointerEvents: "none" }}></div>
          </div>
          <br />
          <div className="form-group col-12" style={{ textAlign: "center", }}>
            <p style={{
              fontSize: "22px",
              position: "relative",
              color: "#FFFFFF",
              textAlign: "center",
            }}> Login</p>
            <div className="row mx-auto">
              <div className="Input mx-auto" >
                <div onKeyPress={(e) => handleSignIn(e)}>
                  <Input type="email"
                    bootstrap="border-0"
                    placeholder="Email"
                    track={setEmail}
                    style={inputStyle}
                    size="27"
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
                  placeholder="Password"
                  track={setPassword}
                  style={inputStyle}
                  size="27"
                />
              </div>
            </div>
          </div>

        </div>
        <div className="row justify-content-md-center col" style={{ margin: "0" }}>
          <button type="submit" className="btn cardBtnStyle"
            style={loginButtonStyle}
            onClick={() => { props.signInUser(email.current.value, password.current.value, setLoginIsSuccessful) }} >
            Login
          </button>
        </div>
        <div className="row justify-content-md-center col" style={{ margin: "0" }}>
          {props.modal ?
            <p className="col-auto" onClick={() => props.setModalState("SignUp")} style={linkStyle}>
              Sign Up
          </p> :
            <Link to="/signup">
              <p className="col-auto" style={linkStyle}>
                Sign Up
              </p>
            </Link>}
        </div>
        <div className="row justify-content-md-center col" style={{ margin: "0" }}>
          <Link to="/forgotpassword">
            <p className="col" style={linkStyle}>
              Forgot Password?
              </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
