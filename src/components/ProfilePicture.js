import React, { useState, useEffect, useRef } from 'react';

function ProfilePicture(props) {
  const [isOpen, setIsOpen] = useState(false);
  const outerDivRef = useRef();

  useEffect(() => {
    setIsOpen(false);

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  function handleClick(e) {
    if (!outerDivRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  function handleShowDialog(e) {
    setIsOpen(!isOpen);
  }

  return (
    <div ref={outerDivRef}>
      <img
        src={props.currentUserInfo.profile_picture}
        onClick={handleShowDialog}
        alt={props.currentUserInfo.username + " picture"}
        width={props.width}
        height={props.height}
        style={{ borderRadius: "50%", cursor: "pointer" }}
        className="img">
      </img>
      {isOpen && (
        <dialog
          className="dialog"
          style={{
            position: "center",
            background: "transparent",
            border: "none",
            zIndex: "20000"
          }}
          open
          onClick={handleShowDialog}
        >
          <img
            className="image"
            src={props.currentUserInfo.profile_picture}
            onClick={handleShowDialog}
            alt="no image"
            width="250px"
            height="200px"
            style={{ cursor: "pointer" }}
          />
        </dialog>
      )}
    </div>
  );
}

export default ProfilePicture;
