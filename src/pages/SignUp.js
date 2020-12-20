import React, { useRef, useState } from "react";
import SignUpButton from "../components/SignUp/SignUpButton.js";
import SignUpColumn from "../components/SignUp/SignUpColumn.js";
import logo from "../images/icons/logo1light.png";
import Input from '../components/Input.js';
import { Link } from "react-router-dom";

function SignUp(props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signUp = () => {
    console.log(email.current.value);
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
    <div className="mx-auto card"
      style={{
        margin: "40px",
        maxWidth: "230px",
        backgroundColor: "#292833",
        borderRadius: "10px",
        boxShadow: "-1px 10px 250px 1px #171421"
      }}>
      <div style={{ margin: "20px 20px 0px 20px" }} className="row">
       <p> <div className="col-2"></div>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-1"></div>
          <img src={logo} style={logoCSS} alt="" />
          <br />
        </div></p>
        <div className="form-group" >
          <Input type="email"
            bootstrap="border border-secondary"
            placeholder="Email"
            track={setEmail} />
        </div>
        <div className="form-group">
          <Input type="password"
            bootstrap="border border-secondary"
            placeholder="Password"
            track={setPassword} />
        </div>
        <div className="row col-12">
          <div className="form-group">
            <SignUpButton click={signUp} />
          </div></div></div>
          <div className="row">
        <div className="col-4"></div>
          <Link to="/signup">
            <p className="col" style={{ color: "#BF9AFC" }}>
              Login
              </p>
          </Link>
          <br />
          </div>
    </div>
  )
}

export default SignUp;