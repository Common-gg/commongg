import React from 'react';
import { Link } from "react-router-dom";
import Login from './Login.js';

function LoginPage(props) {

  const linkStyle = {
    color: "#BF9AFC",
    textDecoration: "underline",
    top: "-12rem",
  }

  return (
    // <div  style={{backgroundImage: `url(${bg})`, backgroundRepeat: "no-repeat", backgroundSize: "auto", backgroundPosition: "center"}}>
    <div className="LoginPage">
      <div className="mx-auto card text-center loginCard">
          <Login {...props} />
        {/* <div style={{ margin: "20px 20px 0px 20px" }}>
          {handleMessagingForUnsuccessfulSignIn()}
          <div className="row mx-auto">
            <div className="col-12 mx-auto" style={{ textAlign: "center", }}>
              <img style={logoCSS} src={logo} />
              <div style={{ pointerEvents: "none" }}></div>
            </div>
            <br />
            <div className="form-group col-12" style={{ textAlign: "center", }}>
              <p style={{ position: "relative", textAlign: "center" }}> The Best Social Network for TFT Content </p>
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
              <button type="submit" className="btn cardBtnStyle"
                onClick={() => { props.signInUser(email.current.value, password.current.value, setLoginIsSuccessful) }} >
                <img src={arrow} />
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
    // </div>
  );
}

export default LoginPage;
