import React, { useEffect, useRef } from 'react';
import Imgix from 'react-imgix';

function ProfilePicture(props) {
  const profileImageRef = useRef();


  useEffect(() => {
    if (profileImageRef.current === undefined)
      return;
  }, [profileImageRef])

  function handleClick(link) {
    props.setProfilePictureImage({
      link: link
    });
  }

  return (
    <Imgix
      src={
        props.user.profile_picture ? (props.user.profile_picture.includes('firebasestorage') ?
          `https://${process.env.REACT_APP_imgixURL}/users/${props.user.id}?fit=max&auto=format,compress&q=75` : props.user.profile_picture) : ""}

      width={props.width}
      height={props.height}
      htmlAttributes={{
        id: "ProfilePictureImage",
        alt: props.user.username + " picture",
        "data-toggle": props.setProfilePictureImage ? "modal" : null,
        "data-target": props.setProfilePictureImage ? "#enlargedProfilePicture" : null,
        onClick: props.setProfilePictureImage ? () => handleClick(`https://${process.env.REACT_APP_imgixURL}/users/${props.user.id}?fit=max&auto=format,compress`) : null,
        ref: profileImageRef,
        style: { borderRadius: "50%", cursor: "pointer" }
      }}
    />
  );
}

export default ProfilePicture;
