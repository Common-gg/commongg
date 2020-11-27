import React from 'react';
import { Link } from "react-router-dom";
import Text from '../components/Text.js'

function EditProfile(props) {

  return (
    <div className="EditProfile">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <Text text="profile" />
            <Text text="home" />
            <Text text="following" />
            <Text text="trending" />
            {props.user.games.map(game => {
              return <Text text={game} key={game} />
            })}
            <Link to="/">
              <p onClick={() => props.signOut()}>Logout</p>
            </Link>
          </div>
          <div className="col-lg-7 text-center">
            <div className="row">
              <div className="col-lg-4">
                <img src={props.user.profile.profile_picture} alt="Avatar" width="190px" />
                <button type="button" className="btn btn-primary">
                  Change Profile Picture
                </button>
              </div>
              <div className="col-lg-8">
                <Text text={props.user.profile.username} />
                <form>
                  <div className="form-group">
                    <label htmlFor="formControlInput1">Email address</label>
                    <input type="email" className="form-control" id="formControlInput1" placeholder={props.user.email} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword1">Password</label>
                    <input type="password" className="form-control" id="inputPassword1" placeholder="Password" />
                  </div>
                </form>
              </div>
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="formControlTextarea1">About Me</label>
                <textarea className="form-control" id="formControlTextarea1" rows="3"></textarea>
              </div>
            </form>
            <div className="row">
              <Text text="Games: (figure out how to replace the numbers with games)" />
              <div className="col-8">
                <div className="container testimonial-group">
                  <div className="row text-center">
                    {props.user.games.map(game => {
                      return <div className="col-2">{game}</div>
                    })}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <button type="button" className="btn btn-primary">
                  Edit Games
                </button>
              </div>
            </div>
            <br />
            <button type="button" className="btn btn-primary">
              Save Changes
            </button>
          </div>
          <div className="col-lg-3">

          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
