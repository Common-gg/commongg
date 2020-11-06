import React from 'react';
import Input from '../components/Input.js';
// import Button from '../components/Button.js';
import ImageInput from '../components/ImageInput.js'

function CreateProfile() {
    // add categories later
  return (
    <div className="CreateProfile">
        <Input type="displayName"/>
        <Input type="email"/>
        <ImageInput type="profileImage"/>
    </div>
  );
}

export default CreateProfile;
