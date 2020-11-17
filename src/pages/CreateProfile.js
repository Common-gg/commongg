import React, { useState } from 'react';
import Input from '../components/Input.js';
// import Button from '../components/Button.js';
import DisplayImage from '../components/DisplayImage.js'

function CreateProfile(props) {
  // add categories later

  const [displayName, setDisplayName] = useState();
  const [img, setImg] = useState('https://static.zerochan.net/Dango.%28Teamfight.Tactics%29.full.2963102.jpg');

  function handleSubmit(event) {
    event.preventDefault();
    props.storeBlob(displayName.current.value, img);
  }

  return (
    <div className="CreateProfile">
      <div className="mx-auto card text-center" style={{ margin: "40px", maxWidth: "230px" }}>
        <h4>Account Creation</h4>
        <Input type="displayName" placeholder="username" track={setDisplayName} />
        <DisplayImage type="profileImage" id="createAvatar" setImg={setImg} />
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
