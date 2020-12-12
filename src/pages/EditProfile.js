import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import Text from '../components/Text.js';
import NavigationBar from '../components/NavigationBar.js';
import logo from "../images/icons/logo1light.png";

function EditProfile(props) {
  const fileInputRef = useRef();
  const aboutMeRef = useRef();
  const [selectedFile, setSelectedFile] = useState({ current: { value: "" } });

  const logoCSS = {
    /* logo1light 1 */
    width: "100px",
    height: "99.01px",
    left: "393px",
    top: "179px"
  }

  function handleUpdateButtonClick(e) {
    props.storeBlob(props.user.profile.username, selectedFile, aboutMeRef.current.value);
    clearFields();
  }

  function fileSelectedHandler(e) {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      console.log(img);
      setSelectedFile(img);
    }
  }

  function clearFields() {
    fileInputRef.current.value = "";
  }

  return (
    <div className="EditProfile">
      <div className="container">
        <div className="row">
          <div className="col-2 text-center">
            <NavigationBar currentUserId={props.currentUserId} currentUserInfo={props.user} signOut={props.signOut} />
          </div>
          <div className="row col-8">
            <div className="row col-12">
              <div className="col-3"></div>
              <div className="col-2">
                <p><h2 style={{ color: "#ffffff" }}>edit profile</h2></p>
                {/* <img src={props.user.profile.profile_picture ?? logo} alt="Avatar" width="190px" /> */}
                <img src={logo} alt="Avatar" style={logoCSS} />
                <input id="fileInput" accept="image/*" type="file" style={{ display: "none" }} ref={fileInputRef} onChange={fileSelectedHandler} />
                <label for="fileInput" className="btn btn-primary">Change Profile Picture</label>
              </div>
              <div className="col-5">
                <div style={{ color: "#FFFFFF" }}>
                  <Text text={props.user.profile.username} />
                </div>
              </div>
            </div>
            <div className="row col-12">
              <div className="row col-12">
                <div className="col-1"></div>
                <div className="col-8">
                  <form>
                    <div className="form-group" style={{ color: "#FFFFFF" }}>
                      <label htmlFor="formControlTextarea1">About Me</label>
                      <textarea className="form-control"
                        rows="5"
                        id="formControlTextarea1"
                        style={{ color: "#292833", resize: "none" }}
                        ref={aboutMeRef}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-6"></div>
              <div className="row col-2">
                <button type="button" className="btn btn-primary" onClick={() => handleUpdateButtonClick()}>
                  update
                </button>
              </div>
              {/* <div className="row" style={{ color: "#FFFFFF" }}>
                  <Text text="Games: (figure out how to replace the numbers with games)" />
                    <div className="container testimonial-group">
                      <div className="row text-center">
                        {props.user.games.map(game => {
                          return <div className="col-2">{game}</div>
                        })}
                      </div>
                  </div>
                  <div className="col-4">
                    <button type="button" className="btn btn-primary">
                      Edit Games
                    </button>
                  </div>
                </div> */}
              {/* <form>
                <div className="form-group" style={{ color: "#FFFFFF" }}>
                  <label htmlFor="formControlInput1">Email address</label>
                  <input type="email" className="form-control" id="formControlInput1" placeholder={props.user.email} style={{ color: "#292833" }} />
                </div>
                <div className="form-group" style={{ color: "#ffffff" }}>
                  <label htmlFor="inputPassword1">Password</label>
                  <input type="password" className="form-control" id="inputPassword1" placeholder="Password" style={{ color: "#292833" }} />
                </div>
              </form> */}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
