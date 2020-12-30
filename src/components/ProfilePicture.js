import React from 'react';

function ProfilePicture(props) {
  return (
    <img
      src={props.currentUserInfo.profile_picture}
      // onClick="enlargeImg"
      alt={props.currentUserInfo.username + " picture"}
      width={props.width}
      height={props.height}
      style={{ borderRadius: "50%" }}
      class="img">
    </img>
  );
}

export default ProfilePicture;
