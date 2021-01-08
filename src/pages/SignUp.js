import React, { useRef, useState } from "react";
import SignUpButton from "../components/SignUp/SignUpButton.js";
import logo from "../images/icons/logo1light.png";
import Input from '../components/Input.js';
import { Link } from "react-router-dom";

function SignUp(props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [failedPassword, setFailedPassword] = useState(false);
  const [failedEmail, setFailedEmail] = useState(0); // 0=valid, 1=in use, 2=doesn't have @/.
  const [missing, setMissing] = useState(false);

  const signUp = () => {
    if ((email !== undefined && email.current.value !== "") && (password !== undefined && password.current.value !== "")) {
      setMissing(false);
      //email already in use
      setFailedEmail(0);
      console.log(email, password);
      if (!(email.current.value.includes('@')) || !(email.current.value.includes('.'))) {
        setFailedEmail(2);
        console.log("reached email");
      } else {
        props.existsEmail(email.current.value).then((existsUser) => {
          if (existsUser === true) {
            setFailedEmail(1);
          }
        })
      }
      //failed password
      setFailedPassword(false);
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
      if (password.current.value.match(regex) === null) {
        setFailedPassword(true);
      }
      //sign up user
      console.log(failedEmail, failedPassword);
      if (failedEmail === 0 && failedPassword === false) {
        props.signUpUser(email.current.value, password.current.value);
      }
    } else {
      setMissing(true);
    }
  }

  const failedSignUp = () => {
    if (missing === true) {
      return (
        <p style={{ color: "red" }}>missing email or password</p>
      )
    } else if (failedEmail === 1) {
      return (
        <p style={{ color: "red" }}>email already in use</p>
      )
    } else if (failedEmail === 2) {
      return (
        <p style={{ color: "red" }}>not a valid email format</p>
      )
    } else if (failedPassword === true) {
      return (
        <p style={{ color: "red" }}>passwords must have at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number</p>
      )
    }
  }

  const logoCSS = {
    /* logo1light 1 */
    width: "4.5rem",
    height: "auto",
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
  }

  return (
    <div>
      <div className="mx-auto card"
        style={{
          margin: "200px",
          maxWidth: "20%",
          maxHeight: "100%",
          backgroundColor: "#292833",
          borderRadius: "10px",
          boxShadow: "-1px 7px 25px 1px #171421"
        }}>

        <div style={{ margin: "20px 20px 0px 20px" }}>
          <div className="row">
            <div className="col-5"></div>
            <img src={logo} style={logoCSS} />
            <div className="col-5" style={{ pointerEvents: "none" }}></div>
            <br />
            <div className="form-group" style={{ marginRight: "10%", }}>
            <p style={{left: "10rem", position: "relative", color: "#BF9AFC" }}> Sign up </p>
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
                          <div className="row">
                            <div className="col-1"></div>
                            <Input type="email"
                              bootstrap="border-0"
                              placeholder="email"
                              track={setEmail}
                              style={inputStyle} />
                          </div></div></div></div></div></div></div></div></div>
          <div className="form-group">
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
                      <Input type="password"
                        bootstrap="border-0"
                        placeholder="password"
                        track={setPassword}
                        style={{
                          backgroundColor: "transparent #292833",
                          color: "#BF9AFC",
                          border: "solid",
                          borderColor: "#BF9AFC",
                          backgroundColor: "#292833",
                          borderRadius: "2px",
                          borderWidth: "1px",
                          padding: "0.3rem",
                          margin: "3%",
                          width: "100%",
                          height: "77%"
                        }} />
                    </div></div></div></div></div></div>
          <div className="d-flex justify-content-center text-center">
            {failedSignUp()}
          </div>
          <div className="row col-12">
            <div className="col-5"></div>
            <div className="form-group">
              <SignUpButton click={signUp} />
            </div></div></div>
          <br />
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="text-center col-4">
          <Link to="/">
            <p className="col" style={{
            position: "relative",
            padding: '.3rem',
            lineHeight: "0.5rem",
            top: "-10.75rem",
            color: "#BF9AFC",
            textDecoration: "underline", 
            }}>
              Login
      </p>
          </Link>
        </div></div></div>
  )
}

export default SignUp;