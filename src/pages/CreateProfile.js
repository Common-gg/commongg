import React, { useEffect, useState } from 'react';
import Input from '../components/Input.js';
// import Button from '../components/Button.js';
import DisplayImage from '../components/DisplayImage.js'
import add from "../images/icons/Group-104.png";
import arrow from "../images/icons/arrow-right.png";
import blankPfp from '../images/icons/empty-pfp-1.png';
import { AutosizeInput } from 'react-bootstrap-typeahead';
import styles from '../App.css';

const Filter = require('bad-words')
const filter = new Filter();

function CreateProfile(props) {
  // add categories later

  const [displayName, setDisplayName] = useState();
  const [img, setImg] = useState(blankPfp);
  const [failedExists, setFailedExists] = useState(false);
  const [failedSpace, setFailedSpace] = useState(false);
  const [failedProfane, setFailedProfane] = useState(false);
  const [failedLength, setFailedLength] = useState(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [displayInputValidationText, setDisplayInputValidationText] = useState(false);
  const [displayImageTypeValidationMessage, setDisplayImageTypeValidationMessage] = useState(false);
  const [imageType, setImageType] = useState(null);

  useEffect(() => {
    clearValidationBools();
  }, []);

  function clearValidationBools() {
    setFailedExists(false);
    setFailedSpace(false);
    setFailedProfane(false);
    setFailedLength(false);
    setDisplayImageTypeValidationMessage(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    clearValidationBools();
    const username = displayName.current.value;

    const usernameRegex = /^(?=.{4,30}$)([_]{0,})([a-zA-Z0-9]{1,})([a-zA-Z0-9_])(?:([a-zA-Z0-9_]))+$/;
    let validUserName = username.match(usernameRegex);

    if ((imageType === "image/jpeg") || (imageType === "image/jpg") || (imageType === "image/png")) {
      setDisplayImageTypeValidationMessage(false);
    }
    else {
      setDisplayImageTypeValidationMessage(true);
      return;
    }
    if ((username !== undefined) && (username !== null) && (username.length > 30)) {
      setDisplayInputValidationText(true);
      return;
    }
    else if (filter.isProfane(username)) {
      setFailedProfane(true);
      return;
    }
    else if (username.includes(" ")) {
      setFailedSpace(true);
      return;
    }
    //check if useername is too short
    else if (username.length < 4) {
      setFailedLength(true);
      return;
    }
    else if (validUserName === null) {
      // If the regex expression is null there was no match and username is invalid
      setIsInvalidUsername(true);
      return;
    }
    //check if username exists
    props.existsUsername(displayName.current.value).then((existsUser) => {
      if (existsUser === true) {
        setFailedExists(true);
      } else {
        if (img === blankPfp) {
          props.storeUserProfile(displayName.current.value, blankPfp, "");
        }
        else {
          props.storeBlob(displayName.current.value, img, "");
        }
      }
    });
    displayValidationMessage();
  }
  const buttonStyle = {
    marginBottom: "15%",
    marginTop: "10%",
    padding: "2% 7% 2% 7%",
    backgroundColor: "transparent",
    color: "#BF9AFC",
    border: "solid",
    borderRadius: "10px",
    borderColor: "#BF9AFC",
    borderWidth: "1px",
    maxWidth: "50%",
    position: "relative",
  }
  const inputStyle = {
    backgroundColor: "transparent",
    color: "#BF9AFC text-center",
    border: "solid",
    borderColor: "#BF9AFC",
    borderRadius: "2px",
    borderWidth: "1px",
    padding: "0.7%",
    width: "40%",
    height: "95%",
    marginLeft: "30%",
    marginTop: "5%",
    overflow: "hidden"
  }
  const validationMessageStyle = {
    color: "#F34D4D",
    marginTop: "1rem"
  };

  function displayValidationMessage() {
    if (displayImageTypeValidationMessage === true) {
      return (
        <p style={validationMessageStyle}>Image type must be png, jpeg, or jpg</p>
      );
    }
    else if (displayInputValidationText === true) {
      return (
        <p style={validationMessageStyle}>Username length cannot exceed 30 characters</p>
      );
    }
    else if (failedExists === true) {
      return (
        <p style={validationMessageStyle}>Username already in use</p>
      );
    }
    else if (failedSpace === true) {
      return (
        <p style={validationMessageStyle}>Username cannot contain space</p>
      );
    }
    else if (failedProfane === true) {
      return (
        <p style={validationMessageStyle}>Username cannot contain profanity</p>
      );
    }
    else if (failedLength === true) {
      return (
        <p style={validationMessageStyle}>Username is too short</p>
      );
    }
    else if (isInvalidUsername === true) {
      return (
        <p style={validationMessageStyle}>Username may only contain numbers, characters, and underscores. It cannot purely be numbers, and must contain alphabetic characters.</p>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }

  return (
    <div className="CreateProfile">
      <div className="mx-auto card text-center createProfileCard">
        <br />
        <h4 style={{ marginTop: "7%" }}>Create Your Profile</h4>
        <span style={{ marginTop: "7%" }}>Pick a Username</span>
        <Input style={inputStyle}
          className= "mx-auto"
          maxLength="15"
          bootstrap="border-0"
          type="displayName"
          placeholder="username"
          track={setDisplayName} />
        {displayValidationMessage()}
        <span style={{ marginTop: "9%", marginBottom: "5%" }}>Add a Profile Picture</span>
        <DisplayImage
          className="mx-auto"
          type="profileImage"
          id="createAvatar"
          currentImg={add}
          setImg={setImg}
          changedInfo={() => { }} setImageType={setImageType} />
        <button
          type="submit"
          className="btn mx-auto"
          style={buttonStyle}
          onClick={handleSubmit}>
          <img src={arrow} />
        </button>
      </div>
    </div>
  );
}

export default CreateProfile;
