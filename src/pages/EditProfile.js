import React from 'react';
import { Link } from "react-router-dom";
import Text from '../components/Text.js';
import NavigationBar from '../components/NavigationBar.js';

function EditProfile(props) {

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
                <img src={props.user.profile.profile_picture} alt="Avatar" width="190px" />
                <button type="button" className="btn btn-primary">
                  Change Profile Picture
                </button>
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
                      <textarea className="form-control" id="formControlTextarea1" rows="3" style={{ color: "#292833" }}></textarea>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-6"></div>
              <div className="row col-2">
                <button type="button" className="btn btn-primary">
                  Save Changes
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
