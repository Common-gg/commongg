import React, { useState, useEffect } from "react";
import Text from '../components/Text.js';
import NavigationBar from '../components/NavigationBar.js';
import ProfileContainer from '../components/Page Containers/ProfileContainer.js';

function Profile(props) {

  return (
    <div className="Profile">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <NavigationBar currentUserId={props.currentUser} currentUserInfo={props.currentUserInfo} signOut={props.signOut} />
          </div>
          <div className="col-lg-7">
            <ProfileContainer getUser={props.getUser} currentUser={props.currentUser.uid} followUser={props.followUser} unFollowUser={props.unFollowUser} />
          </div>
          <div className="col-lg-3">
            <Text text="col 3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
