import React, { useState, useEffect, useRef } from 'react';

function ProfilePicture(props) {
  const profileImageRef = useRef();


  useEffect(() => {
    if (profileImageRef.current === undefined)
      return;
  }, [profileImageRef])

  function handleClick() {
    const img = document.getElementById("ProfilePictureImage");
    const natWidth = img.naturalWidth;
    const natHeight = img.naturalHeight;

    props.setProfilePictureImage({
      link: profileImageRef.current.currentSrc,
      width: natWidth,
      height: natHeight
    });
  }

  return (
    <img
      id="ProfilePictureImage"
      data-toggle="modal"
      data-target="#enlargedProfilePicture"
      onClick={handleClick}
      ref={profileImageRef}
      src={props.currentUserInfo.profile_picture}
      alt={props.currentUserInfo.username + " picture"}
      width={props.width}
      height={props.height}
      style={{ marginRight: "-2rem", marginTop: "0.9rem", borderRadius: "50%", cursor: "pointer" }}
    >
    </img>
  );
}

export default ProfilePicture;
