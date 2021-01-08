import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import DisplayImage from "../../components/DisplayImage.js"
import edit from "../../images/icons/edit-1.png";
import Input from "../Input.js";
import Label from "../Label.js";
import ArrowLeft from "../../images/icons/arrowleft 1.png"

function SettingsContainer(props) {
  const aboutMeRef = useRef();
  const [selectedFile, setSelectedFile] = useState({ current: { value: "" } });
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [passwordChangeIsSuccessful, setPasswordChangeIsSuccessful] = useState(null);
  const [loadChangePasswordFields, setLoadChangePasswordFields] = useState(null);
  const [errorString, setErrorString] = useState("");
  const [updateButtonText, setUpdateButtonText] = useState("update");
  const history = useHistory();

  useEffect(() => {
    aboutMeRef.current.value = props.currentUserInfo.about_me;
    setSelectedFile({ current: { value: props.currentUserInfo.profile_picture } });
    setLoadChangePasswordFields(false);
    setPasswordChangeIsSuccessful(false);
  }, []);

  useEffect(() => {
    setLoadChangePasswordFields(loadChangePasswordFields);
  }, loadChangePasswordFields)

  const settingsContainerStyle = {
    border: "solid",
    borderBottomstyle: "none",
    borderRadius: "10px",
    borderColor: "#5F5177",
    borderWidth: "1px",
    padding: "0px 0px 50px 0px",
    overflow: "hidden"
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    color: "#BF9AFC",
    border: "solid",
    borderRadius: "10px",
    borderColor: "#BF9AFC",
    borderWidth: "2px",
    padding: "0.6rem"
  };

  const backButtonStyle = {
    backgroundColor: "transparent",
    color: "#BF9AFC",
    borderWidth: "2px",
    padding: "0.6rem"
  };

  const editButtonStyle = {
    width: "60px",
    height: "60px"
  };

  const imageBackButtonStyle = {
    width: "35px",
    height: "35px"
  };
  const linkStyle = {
    color: "#BF9AFC",
    textDecoration: "underline"
  }

  function handleUpdateButtonClick(e) {
    let aboutMe = props.currentUserInfo.about_me;
    let profilePicture = props.currentUserInfo.profile_picture;
    let profilePictureUpdated = false;

    aboutMe = aboutMeRef.current.value;
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
    setUpdateButtonText("saved");
  }

  const changedInfo = () => {
    if (updateButtonText === "saved") {
      setUpdateButtonText("update");
    }
  }

  function handlePasswordMessageChange() {
    if (passwordChangeIsSuccessful === null) {
      return setErrorString(<div></div>);
    }
    else if (passwordChangeIsSuccessful === false) {
      return setErrorString(<p style={{ color: "#F34D4D" }}>Unable to reset password. Double check that your current password was typed correctly and your new and confirmed passwords match</p>);
    }
    else {
      return setErrorString(<p style={{ color: "green" }}>password changed successfully!</p>);
    }
  }

  async function handlePasswordButtonClick() {
    if (loadChangePasswordFields === false || loadChangePasswordFields === null) {
      setLoadChangePasswordFields(true);
      return;
    }
    else {
      try {
        let newPass = newPassword.current === undefined ? "" : confirmNewPassword.current.value;
        let confirmNew = confirmNewPassword.current === undefined ? "" : confirmNewPassword.current.value;

        if (newPass !== confirmNew) {
          setPasswordChangeIsSuccessful(false);
          return;
        }
        else {
          await props.changePasswordFromSettingsPage(currentPassword.current.value, confirmNewPassword.current.value, setPasswordChangeIsSuccessful);
          handlePasswordMessageChange();
        }
      }
      catch { }
    }
  }

  return (
    <div className="SettingsContainer" style={settingsContainerStyle}>
      <div className="row">
        <div className="col-4">
          <button type="button"
            className="btn"
            style={backButtonStyle}
            onClick={history.goBack}
          >
            <img src={ArrowLeft} style={imageBackButtonStyle} />
          </button>
        </div>
        <div className="col-4">
          <br />
          <h2 className="text-center" style={{ color: "#BF9AFC" }}>edit profile</h2>
          <div style={{ cursor: "pointer" }}>
            <DisplayImage type="profileImage" id="fileInput"
              currentImg={props.currentUserInfo.profile_picture} setImg={setSelectedFile} changedInfo={changedInfo} />
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
              <img src={edit} style={editButtonStyle} />
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
              onClick={changedInfo}
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
          style={buttonStyle}>
          {updateButtonText}
        </button>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        {errorString}
      </div>
      <div className="row">
        <div className="col-4"></div>
        <form className="col-4">
          {loadChangePasswordFields ? (
            <div className="form-group">
              <Label htmlFor="currentPassword" text="current password" />
              <Input type="password"
                bootstrap="border border-secondary"
                style={{ backgroundColor: "#292833", }}
                track={setCurrentPassword}
                id="currentPassword"
              />
              <br />
              <Label htmlFor="newPassword" text="new password" />
              <Input type="password"
                bootstrap="border border-secondary"
                style={{ backgroundColor: "#292833" }}
                track={setNewPassword}
                id="newPassword"
              />
              <br />
              <Label htmlFor="confirmNewPassword" text="confirm new password" />
              <Input type="password"
                bootstrap="border border-secondary"
                style={{ backgroundColor: "#292833", }}
                track={setConfirmNewPassword}
                id="confirmNewPassword"
              />
              <br />
            </div>
          ) : null}
          <div className="col-12">
            <button type="button"
              className="btn"
              style={buttonStyle}
              onClick={() => handlePasswordButtonClick()}
            >
              change password
          </button>
          </div>
        </form>
      </div>
      <br />
      <hr style={{ backgroundColor: '#BF9AFC', width: '90%', left: "5px" }} />
      <div className="row">
        <div className="col text-center">
          <Link to="/" style={linkStyle}>
            <br /><p onClick={() => props.signOut()}>sign out</p>
          </Link>
          <br /><p style={{ color: "#BF9AFC" }}>suggestions? <br /> join our <a href="https://discord.gg/dsEAEGGaHn" style={linkStyle}>discord</a></p>
          <Link to="/termsofservice">
            <p className="col" style={linkStyle}>
              privacy policy, cookie policy <br />
                & terms of service
              </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SettingsContainer;
