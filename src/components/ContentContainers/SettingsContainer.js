import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import Text from '../../components/Text.js';
import ProfilePicture from '../../components/ProfilePicture.js';
import edit from "../../images/icons/edit-1.png";

function SettingsContainer(props) {

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
        <div className="SettingsContainer">
            <div className="row col-12">
                <div className="col-3"></div>
                <div className="col-4">
                    <p><h2 style={{ color: "#BF9AFC" }}>edit profile</h2></p>
                    <ProfilePicture user={props.user} width="190px" height="190px" />
                    <input id="fileInput"
                        accept="image/*"
                        type="file"
                        style={{ display: "none", backgroundColor: "transparent" }}
                        ref={fileInputRef}
                        onChange={fileSelectedHandler} />
                    <label for="fileInput"
                        className="btn"
                        style={{ backgroundColor: "transparent", }}>
                        <img src={edit} alt="" /></label>
                </div>
            </div>
            {/* <div className="row col-1">
            <div className="col-8">
                <div style={{ color: "#FFFFFF" }}>
                  <Text text={props.user.profile.username} />
                  </div>
                </div>
              </div> */}
            <div className="row col-12">
                <div className="row col-12">
                    <div className="col-1"></div>
                    <div className="col-8">
                        <form>
                            <div className="form-group" style={{ color: "#FFFFFF" }}>
                                {/* <label htmlFor="formControlTextarea1">About Me</label> */}
                                <textarea className="form-control"
                                    rows="3"
                                    id="formControlTextarea1"
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "#ffffff",
                                        resize: "none",
                                    }}
                                    ref={aboutMeRef}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-7"></div>
                <div className="row col-2">
                    <button type="button"
                        className="btn"
                        onClick={() => handleUpdateButtonClick()}
                        style={{
                            backgroundColor: "transparent",
                            color: "#BF9AFC",
                            border: "solid",
                            borderRadius: "10px",
                            borderColor: "#BF9AFC",
                            borderWidth: "2px"
                        }}>
                        update
                </button>
                </div>
                <div className="row col-8">
                    <div className="row col-12">
                        <div className="col-6"></div>
                        <div className="col-5 text-center">
                            <Link to="/" style={{ color: "#BF9AFC" }}>
                                <br /><br /><p>Sign Out?</p>
                            </Link>
                            <br /><p style={{ color: "#BF9AFC" }}>Suggestions? <br /> Join our <Link to="/" style={{ color: "#BF9AFC" }}>discord</Link></p>
                        </div></div></div>
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
    );
}

export default SettingsContainer;
