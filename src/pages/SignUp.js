import React, { useRef, useState } from "react";
import SignUpButton from "../components/SignUp/SignUpButton.js";
import logo from "../images/icons/logo1light.png";
import Input from '../components/Input.js';
import { Link } from "react-router-dom";

function SignUp(props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [failedPassword, setFailedPassword] = useState(false);

  const signUp = () => {
    setFailedPassword(false);
    //first check the validity of the password
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
    //password faield to match regex
    if (password.current.value.match(regex) === null) {
      setFailedPassword(true);
    }
    props.signUpUser(email.current.value, password.current.value);
  }

  const logoCSS = {
    /* logo1light 1 */
    width: "100px",
    height: "99.01px",
    left: "393px",
    top: "179px"
  }

  return (
    <div>
      <div className="mx-auto card"
        style={{
          margin: "150px",
          maxWidth: "410px",
          backgroundColor: "#292833",
          borderRadius: "10px",
          boxShadow: "-1px 10px 250px 1px #171421"
        }}>

        <div style={{ margin: "20px 20px 0px 20px" }}>
          <div className="row">
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
                      <br />
                      <Input type="email"
                        bootstrap="border border-secondary"
                        placeholder="email"
                        track={setEmail}
                        style={{ backgroundColor: "#292833", }} />
                    </div></div></div></div></div></div>
          <div className="form-group">
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
                        <Input type="password"
                          bootstrap="border border-secondary"
                          placeholder="password"
                          track={setPassword}
                          style={{ backgroundColor: "#292833", }}/>
                        
                      </div></div></div></div></div></div></div>
          <div className="d-flex justify-content-center">
            {failedPassword ? <p style={{ color: "red" }}>passwords must have at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number.</p>: null}
          </div>
          <div className="row col-12">
            <div className="col-5"></div>            
            <div className="form-group">
              <SignUpButton click={signUp} />
            </div></div></div>
        <div className="row">
          <div className="col-5"></div>

          <br />
        </div>

      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="text-center col-4">
          <Link to="/">
            <p className="col" style={{ color: "#BF9AFC", textDecoration: "underline" }}>
              Login
      </p>
          </Link>
        </div></div></div>
  )
}

export default SignUp;