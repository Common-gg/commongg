import React, { useState, useEffect, useRef } from 'react';

function ProfilePicture(props) {
  const profileImageRef = useRef();


  useEffect(() => {
    if (profileImageRef.current === undefined)
      return;
  }, [profileImageRef])

  function handleClick() {
    const img = document.getElementsByClassName("ProfilePicture");
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
      className="ProfilePicture"
      data-toggle="modal"
      data-target="#enlargedProfilePicture"
      onClick={handleClick}
      ref={profileImageRef}
      src={props.currentUserInfo.profile_picture}
      alt={props.currentUserInfo.username + " picture"}
      width={props.width}
      height={props.height}
      style={{ borderRadius: "50%", cursor: "pointer" }}
    >
    </img>
  );
}

export default ProfilePicture;
