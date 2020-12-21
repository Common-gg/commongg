import React from 'react';

function ProfilePicture(props) {
  return (
    <img
      src={props.currentUserInfo.profile_picture}
      alt={props.currentUserInfo.username + " picture"}
      width={props.width}
      height={props.height}
      style={{ borderRadius: "50%" }}>
    </img>
  );
}

export default ProfilePicture;
