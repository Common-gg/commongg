import React, { useState } from 'react';
import Input from '../components/Input.js';
// import Button from '../components/Button.js';
import DisplayImage from '../components/DisplayImage.js'
import add from "../images/icons/Group-104.png";

function CreateProfile(props) {
  // add categories later

  const [displayName, setDisplayName] = useState();
  const [img, setImg] = useState('https://static.zerochan.net/Dango.%28Teamfight.Tactics%29.full.2963102.jpg');

  function handleSubmit(event) {
    event.preventDefault();
    props.storeBlob(displayName.current.value, img);
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
        margin: "150px",
        maxWidth: "485px",
        backgroundColor: "#292833",
        borderRadius: "10px",
        boxShadow: "-1px 10px 250px 1px #171421",
        color: "#BF9AFC"
      }}>

        <h4>create your profile</h4>
        < br />
        Pick a username
        <Input type="displayName" placeholder="username" track={setDisplayName} style= {{ backgroundColor: "#292833" }}  />
        < br />
        add a profile picture
        <DisplayImage type="profileImage" id="createAvatar" currentImg={add} setImg={setImg} />
        <button type="submit" className="btn btn-outline-dark"
          style={{ marginBottom: "20px" }}
          onClick={handleSubmit}>
          Complete
        </button>
      </div>
    </div>


  );
}

export default CreateProfile;
