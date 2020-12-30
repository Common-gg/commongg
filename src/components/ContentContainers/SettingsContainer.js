import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import DisplayImage from "../../components/DisplayImage.js"
import edit from "../../images/icons/edit-1.png";

function SettingsContainer(props) {
  const aboutMeRef = useRef();
  const [selectedFile, setSelectedFile] = useState({ current: { value: "" } });

  useEffect(() => {
    aboutMeRef.current.value = props.currentUserInfo.about_me;
    setSelectedFile({ current: { value: props.currentUserInfo.profile_picture } });
  }, []);

  function handleUpdateButtonClick(e) {
    let aboutMe = props.currentUserInfo.about_me;
    let profilePicture = props.currentUserInfo.profile_picture;
    let profilePictureUpdated = false;

    if (aboutMeRef.current.value !== "") {
      aboutMe = aboutMeRef.current.value;
    }
    //seleted file initializes to { current: { value: "" } }
    //if selected doesn't have current it means it loaded from setImage
    if (selectedFile.current === undefined) {
      profilePictureUpdated = true;
      profilePicture = selectedFile;
    }
    if (profilePictureUpdated) {
      props.storeBlob(props.currentUserInfo.username, profilePicture, aboutMe);
    } else {
      props.storeUserAboutMe(aboutMe);
    }

  }

  return (
    <div className="SettingsContainer" style={{
      border: "solid",
      borderBottomstyle: "none",
      borderRadius: "10px",
      borderColor: "#5F5177",
      borderWidth: "1px",
      padding: "0px 0px 50px 0px",
      overflow: "hidden"
    }}>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <br />
          <h2 className="text-center" style={{ color: "#BF9AFC" }}>edit profile</h2>
          <div style={{ cursor: "pointer" }}>
            <DisplayImage type="profileImage" id="fileInput"
              currentImg={props.currentUserInfo.profile_picture} setImg={setSelectedFile} />
            <label htmlFor="fileInput"
              className="btn"
              style={{
                width: "30px",
                height: "30px",
                background: "transparent",
                position: 'relative',
                top: "-6rem",
                right: "-6.5rem"
              }}>
              <img src={edit} style={{ width: "60px", height: "60px" }} />
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <form className="col-10">
          <div className="form-group" style={{ color: "#FFFFFF" }}>
            <textarea className="form-control"
              rows="3"
              id="formControlTextarea1"
              placeholder="About me..."
              maxLength="150"
              ref={aboutMeRef}
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                resize: "none",
                maxWidth: "100%",
                borderStyle: "solid",
                borderRadius: "5px",
                borderColor: "#BF9AFC",
                borderWidth: "1px",
              }}
            />
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-9"></div>
        <button type="button"
          className="btn"
          onClick={() => handleUpdateButtonClick()}
          style={{
            backgroundColor: "transparent",
            color: "#BF9AFC",
            border: "solid",
            borderRadius: "10px",
            borderColor: "#BF9AFC",
            borderWidth: "2px",
            width: "15%",
            padding: "0.6rem"
          }}>
          update
          </button>
      </div>
      <br />
      <hr style={{ backgroundColor: '#BF9AFC', width: '90%', left: "5px" }} />
      <div className="row">
        <div className="col text-center">
          <Link to="/" style={{ color: "#BF9AFC", textDecoration: "underline", }}>
            <br /><p onClick={() => props.signOut()}>sign out</p>
          </Link>
          <br /><p style={{ color: "#BF9AFC" }}>suggestions? <br /> join our <a href="https://discord.gg/dsEAEGGaHn" style={{ color: "#BF9AFC", textDecoration: "underline" }}>discord</a></p>
        </div>
      </div>
    </div>
  );
}

export default SettingsContainer;
