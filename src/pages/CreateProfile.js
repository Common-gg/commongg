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
        margin: "200px",
        maxWidth: "20%",
        backgroundColor: "#292833",
        borderRadius: "10px",
        boxShadow: "-1px 7px 25px 1px #171421",
        color: "#BF9AFC"
      }}>
        <br />
        <h4 style={{marginTop:"2rem"}}>create your profile</h4>
        <span style={{marginTop:"2rem"}}>pick a username</span>
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
          marginLeft: "25%",
          marginTop: "1.1rem"
        }}
          maxLength="15" bootstrap="border-0" type="displayName" placeholder="username" track={setDisplayName} />
        {failedExists ? <p style={{ color: "#F34D4D", marginTop:"1rem"  }}>username already in use</p> : null}
        {failedSpace ? <p style={{ color: "#F34D4D", marginTop:"1rem", marginbottom: "-5rem"  }}>username can't contain space</p> : null}
        {failedProfane ? <p style={{ color: "#F34D4D", marginTop:"1rem"  }}>username contains profanity</p> : null}
        {failedLength ? <p style={{ color: "#F34D4D", marginTop:"1rem"  }}>username is too short</p> : null}
        <span style={{marginTop:"3rem"}}>Add a Profile Picture</span>
        <DisplayImage type="profileImage" id="createAvatar" currentImg={add} setImg={setImg} changedInfo={() => { }} />
        <button type="submit" className="btn"
          style={{
            marginBottom: "20px",
            padding: "0.4rem",
            backgroundColor: "transparent",
            color: "#BF9AFC",
            border: "solid",
            borderRadius: "10px",
            borderColor: "#BF9AFC",
            borderWidth: "2px",
            maxWidth: "15%",
            position: "relative",
            left: "10rem",
            marginTop: "1rem",
            marginBottom: "2.7rem"
          }}
          onClick={handleSubmit}>
          <img src={arrow} />
        </button>
      </div>
    </div>


  );
}

export default CreateProfile;
