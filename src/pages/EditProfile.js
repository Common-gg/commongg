import React from 'react';
import Image from '../components/Image.js';
import Text from '../components/Text.js'
import Button from '../components/Button.js'
import Input from '../components/Input.js';
import ImageInput from '../components/ImageInput.js';

function EditProfile(props) {

  return (
    <div className="EditProfile">
        <Image src={props.user.src}/>
        <ImageInput type="src"/>
        <br/>
        <Text text={"Display Name: " + props.user.displayName}/>
        <Input type="displayName"/>
        <br/>
        <Text text={"Personal Bio: " + props.user.bio}/>
        <Input type="bio"/>
        <br/>
        <br/>
        <Button text="Save"/>
    </div>
  );
}

export default EditProfile;
