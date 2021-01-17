import React, { useRef, useState } from "react";
import SignUpButton from "../components/SignUp/SignUpButton.js";
import TermsOfService from "./TermsOfService.js"
import logo from "../images/icons/logo1light.png";
import Input from '../components/Input.js';
import { Link } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ArrowLeft from "../images/icons/arrowleft 1.png"

function SignUp(props) {
  const initialCurrentValue = { current: { value: "" } };
  const [email, setEmail] = useState(initialCurrentValue);
  const [password, setPassword] = useState(initialCurrentValue);

  const [showTosModal, setShowTosModal] = useState(false);
  const [failedPassword, setFailedPassword] = useState(false);
  const [failedEmail, setFailedEmail] = useState(0); // 0=valid, 1=in use, 2=doesn't have @/.
  const [missing, setMissing] = useState(false);
  const [tosCheckbox, setTosCheckbox] = useState(false);
  const [agreeToTos, setAgreeToTos] = useState(null);

  function resetValidationVariables() {
    setShowTosModal(false);
    setFailedPassword(false);
    setFailedEmail(0);
    setMissing(false);
    setTosCheckbox(null);
  }

  const signUp = () => {
    if (email.current.value === "" || password.current.value === "") {
      setMissing(true);
      return;
    }
    if ((email !== undefined && email.current.value !== "") && (password !== undefined && password.current.value !== "")) {
      setMissing(false);
      //email already in use
      setFailedEmail(0);

      if (!(email.current.value.includes('@')) || !(email.current.value.includes('.'))) {
        setFailedEmail(2);
      } else {
        props.existsEmail(email.current.value).then((existsUser) => {
          if (existsUser === true) {
            setFailedEmail(1);
          }
        })
      }
      //failed password
      setFailedPassword(false);
      const validatePasswordRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{6,}$/
      let passwordStrength = password.current.value.match(validatePasswordRegex);

      if (passwordStrength === null) {
        setFailedPassword(true);
        return;
      }
      if (tosCheckbox === false) {
        setAgreeToTos(false);
        return;
      } else {
        setAgreeToTos(true);
      }
      //sign up user
      props.signUpUser(email.current.value, password.current.value);
    }
    else {
      if (failedEmail === 0 && !failedPassword && agreeToTos && !missing) {
        props.signUpUser(email.current.value, password.current.value);
      }
      resetValidationVariables();
    }
  }

  const failedSignUp = () => {
    if (missing === true) {
      return (
        <p style={{ color: "#F34D4D" }}>missing email or password</p>
      )
    } else if (failedEmail === 1) {
      return (
        <p style={{ color: "#F34D4D" }}>email already in use</p>
      )
    } else if (failedEmail === 2) {
      return (
        <p style={{ color: "#F34D4D" }}>not a valid email format</p>
      )
    } else if (failedPassword === true) {
      return (
        <p style={{ color: "#F34D4D" }}>passwords must have at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number</p>
      )
    }
    else if (agreeToTos === false) {
      return (
        <p style={{ color: "#F34D4D" }}>must agree with the Terms of Service before signing up</p>
      )
    } else {
      return (<div></div>);
    }
  }

  function handleChecked(e) {
    setTosCheckbox(e.target.checked);
    setShowTosModal(false);
  }

  function showTosModalTrue() {
    setShowTosModal(true);
  }

  const logoCSS = {
    /* logo1light 1 */
    width: "4.5rem",
    height: "auto",
    marginBottom: "20px"
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
    width: "80%",
    height: "77%",
    marginLeft: "10%"
  }
  const modalBodyStyle = {
    color: "#BF9AFC",
    backgroundColor: "#202020",
    width: "45rem",
    height: "45rem",
    border: "none",
    maxHeight: "calc(100vh - 210px)",
    overflowY: "auto"
  };
  const modalStyle = {
    width: "80rem",
    height: "50rem",
    display: "flex",
    margin: "auto",
    border: "none"
  }

  function signUpForApp(e) {
    if (e.key === "Enter") {
      signUp();
    }
  }

  return (
    <div className="SignUp">
      <Modal show={showTosModal} style={modalStyle} >
        <Modal.Body style={modalBodyStyle}>
          <div className="row">
            <button type="button" style={{ marginLeft: "42rem", color: "#BF9AFC" }} className="close" aria-label="Close">
              <span id="createPostX" aria-hidden="true" onClick={() => { setShowTosModal(false) }}>&times;</span>
            </button>
            <TermsOfService />
            <hr style={{ backgroundColor: '#BF9AFC', width: '90%', left: "5px" }} />
          </div>
        </Modal.Body>

      </Modal>
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
          <div className="row mx-auto">
            <div className="col-12 mx-auto" style={{ textAlign: "center", }}>
              <img style={logoCSS} src={logo} />
              <div style={{ pointerEvents: "none" }}></div>
            </div>
            <br />
            <div className="form-group col-12">
              <p style={{ position: "relative", color: "#BF9AFC", textAlign: "center", }}> sign up </p>
              <div className="row mx-auto">
                <Input type="email"
                  bootstrap="border-0"
                  placeholder="email"
                  track={setEmail}
                  style={inputStyle} />
              </div>
            </div>
          </div>
          <div className="form-group col-12">
            <div className="row mx-auto">
              <div style={inputStyle} onKeyDown={(e) => signUpForApp(e)}>
                <Input type="password"
                  bootstrap="border-0"
                  placeholder="password"
                  track={setPassword}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center text-center">

            <Form.Group controlId="tosCheckBox">
              <Form.Check onChange={(e) => handleChecked(e)} type="checkbox" label="I accept the " />
              <a href="#" onClick={showTosModalTrue} style={{ textDecoration: "underline" }}>
                Terms Of Service
              </a>
            </Form.Group>

          </div>
          <div className="d-flex justify-content-center text-center">
            {failedSignUp()}
          </div>
          <div className="form-group col-12" style={{ textAlign: "center", }}>
            <SignUpButton click={signUp} />
          </div>
        </div>
        <br />
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="text-center col-4">
          <p className="col" style={{
            position: "relative",
            top: "-10rem",
            color: "#BF9AFC",
          }}>
            already have an account? </p>
          <Link to="/">
            <p className="col" style={{
              position: "relative",
              padding: '.3rem',
              top: "-11rem",
              color: "#BF9AFC",
              textDecoration: "underline",
            }}>
              login here!
      </p>
          </Link>
        </div></div></div>
  )
}

export default SignUp;