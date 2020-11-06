import React from 'react';
import Image from '../components/Image.js';
import Text from '../components/Text.js'
import Button from '../components/Button.js'

function Profile(props) {

  return (
    <div className="Profile">
        <Image src={props.user.src}/>
        <Text text={props.user.displayName}/>
        <Text text={props.user.bio}/>
        <Text text={"Follower Count: " + props.user.followerCount}/>
        <Text text={"Following Count: " + props.user.followingCount}/>
        <Button text="Edit Profile"/>
    </div>
  );
}

export default Profile;
