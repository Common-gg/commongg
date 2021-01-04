import React, { useState } from 'react';
import Input from '../components/Input.js';
// import Button from '../components/Button.js';
import DisplayImage from '../components/DisplayImage.js'
import add from "../images/icons/Group-104.png";
import arrow from "../images/icons/arrow-right.png";

const Filter = require('bad-words')
const filter = new Filter();

function CreateProfile(props) {
  // add categories later

  const [displayName, setDisplayName] = useState();
  const [img, setImg] = useState('https://static.zerochan.net/Dango.%28Teamfight.Tactics%29.full.2963102.jpg');
  const [failedExists, setFailedExists] = useState(false);
  const [failedSpace, setFailedSpace] = useState(false);
  const [failedProfane, setFailedProfane] = useState(false);

  
  function handleSubmit(event) {
    event.preventDefault();
    setFailedExists(false);
    setFailedSpace(false);
    setFailedProfane(false);
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
    //check if username exists
    props.existsUsername(displayName.current.value).then((existsUser) => {
      if (existsUser === true) {
        setFailedExists(true);
      } else {
        props.storeBlob(displayName.current.value, img);
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
        boxShadow: "-1px 10px 250px 1px #171421",
        color: "#BF9AFC"
      }}>
        <br />
        <h4>create your profile</h4>
        < br />
        Pick a username
        <Input style={{ backgroundColor: "#292833" }} minLength="4" maxLength="15" type="displayName" placeholder="username" track={setDisplayName}/>
        {failedExists ? <p style={{ color: "red" }}>username already in use</p> : null}
        {failedSpace ? <p style={{ color: "red" }}>username can't contain space</p> : null}
        {failedProfane ? <p style={{ color: "red" }}>username contains profanity</p> : null}
        < br />
        add a profile picture
        <DisplayImage type="profileImage" id="createAvatar" currentImg={add} setImg={setImg} changedInfo={() => {}} />
        <button type="submit" className="btn btn-outline-dark"
          style={{
            marginBottom: "20px",
            backgroundColor: "transparent",
            color: "#BF9AFC",
            border: "solid",
            borderRadius: "10px",
            borderColor: "#BF9AFC",
            borderWidth: "2px"
          }}
          onClick={handleSubmit}>
          <img src={arrow} />
        </button>
      </div>
    </div>


  );
}

export default CreateProfile;
