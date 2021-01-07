import React, { useState } from 'react';
import Input from '../components/Input.js';
// import Button from '../components/Button.js';
import DisplayImage from '../components/DisplayImage.js'
import add from "../images/icons/Group-104.png";
import arrow from "../images/icons/arrow-right.png";
import blankPfp from '../images/icons/empty-pfp-1.png';

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



  function handleSubmit(event) {
    event.preventDefault();
    setFailedExists(false);
    setFailedSpace(false);
    setFailedProfane(false);
    setFailedLength(false);
    const username = displayName.current.value;
    if (filter.isProfane(username)) {
      setFailedProfane(true);
      return;
    }
    //check if there is space in useername
    if (username.includes(" ")) {
      setFailedSpace(true);
      return;
    }

    //check if useername is too short
    if (username.length < 4) {
      setFailedLength(true);
      return;
    }

    //check if username exists
    props.existsUsername(displayName.current.value).then((existsUser) => {
      if (existsUser === true) {
        setFailedExists(true);
      } else {
        props.storeBlob(displayName.current.value, img, "");
      }
    })
  }

  const addCSS = {
    /* add image */
    width: "216px",
    height: "216px",
    left: "calc(50% - 216px/2)",
    top: "calc(50% - 216px/2 + 91px)",
  }

  return (
    <div className="CreateProfile">
      <div className="mx-auto card text-center" style={{
        margin: "175px",
        maxWidth: "485px",
        backgroundColor: "#292833",
        borderRadius: "10px",
        boxShadow: "-1px 7px 25px 1px #171421",
        color: "#BF9AFC"
      }}>
        <br />
        <h4>create your profile</h4>
        < br />
        Pick a username
        <Input style={{
          backgroundColor: "transparent #292833",
          color: "#BF9AFC text-center",
          border: "solid",
          borderColor: "#BF9AFC",
          backgroundColor: "#292833",
          borderRadius: "2px",
          borderWidth: "1px",
          padding: "0.3rem",
          width: "50%",
          height: "95%",
          marginLeft: "25%"
        }}
          maxLength="15" bootstrap="border-0" type="displayName" placeholder="username" track={setDisplayName} />
        {failedExists ? <p style={{ color: "red" }}>username already in use</p> : null}
        {failedSpace ? <p style={{ color: "red" }}>username can't contain space</p> : null}
        {failedProfane ? <p style={{ color: "red" }}>username contains profanity</p> : null}
        {failedLength ? <p style={{ color: "red" }}>username is too short</p> : null}
        < br />
        add a profile picture
        <DisplayImage type="profileImage" id="createAvatar" currentImg={add} setImg={setImg} changedInfo={() => { }} />
        <button type="submit" className="btn"
          style={{
            marginBottom: "20px",
            padding: "0.3rem",
            backgroundColor: "transparent",
            color: "#BF9AFC",
            border: "solid",
            borderRadius: "10px",
            borderColor: "#BF9AFC",
            borderWidth: "2px",
            maxWidth: "10%",
            position: "relative",
            left: "13.4rem",
          }}
          onClick={handleSubmit}>
          <img src={arrow} />
        </button>
      </div>
    </div>


  );
}

export default CreateProfile;
