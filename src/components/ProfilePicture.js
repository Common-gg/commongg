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
    props.user.profile_picture ? (props.user.profile_picture.includes('firebasestorage') ?
      // the new default pfp + user inputted pfp
      <Imgix
        src={`https://${process.env.REACT_APP_imgixURL}/users/${props.user.id}?fit=max&auto=format,compress&q=75`}
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
      /> :
      // if the account has an old default pfp
      <img
        id="ProfilePictureImage"
        data-toggle={props.setProfilePictureImage ? "modal" : null}
        data-target={props.setProfilePictureImage ? "#enlargedProfilePicture" : null}
        onClick={props.setProfilePictureImage ? () => handleClick(props.user.profile_picture) : null}
        ref={profileImageRef}
        src={props.user.profile_picture}
        alt={props.user.username + " picture"}
        width={props.width}
        height={props.height}
        style={{ borderRadius: "50%", cursor: "pointer" }}
      >
      </img>
    ) :
      // if the account was deleted
      <img
        alt={props.user.username + " picture"}
        width={props.width}
        height={props.height}
        style={{ borderRadius: "50%", cursor: "pointer" }}
      >
      </img>
  )
}

export default ProfilePicture;
