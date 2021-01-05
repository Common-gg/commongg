import React, { useState, useEffect, useRef } from 'react';

function ProfilePicture(props) {
  const [isOpen, setIsOpen] = useState(false);
  const outerDivRef = useRef();

  useEffect(() => {
    setIsOpen(false);
  }, []);

  function handleClick() {
    props.setProfilePictureImage({
      link: props.currentUserInfo.profile_picture,
      width: props.currentUserInfo.profile_picture.width,
      height: props.currentUserInfo.profile_picture.height
    })
  }

  return (
    <img
      className="ProfilePicture"
      data-toggle="modal"
      data-target="#enlargedProfilePicture"
      onClick={handleClick}
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
