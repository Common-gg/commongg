import React, { useEffect } from 'react';
import ProfilePicture from './ProfilePicture.js';
import { Link } from "react-router-dom";
import optionsIcon from '../images/icons/options.png';
import check from "../images/icons/followingcheck-1.png";

function UserCard(props) {
  function checkOptions() {
    let modLvl;
    if (!props.currentUserInfo.moderationLevel) {
      modLvl = 0;
    } else {
      modLvl = props.currentUserInfo.moderationLevel;
    }
    return (
      <div>
        <div id="dropdownMenuButton" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ background: "transparent" }}>
          <img src={optionsIcon} alt={"options"} style={{ backgroundColor: "transparent" }} />
        </div>
        <div className="dropdown-menu-right dropdown-menu" aria-labelledby="dropdownMenuButton">
          {modLvl > 1 ? <p className="dropdown-item mb-0" onClick={() => props.verifyUser(props.userId, !props.user.verified)} style={{ cursor: "pointer" }}>Verify User/Revoke Verification</p> : null}
          <p className="dropdown-item mb-0" onClick={() => props.report("users", props.userId)} style={{ cursor: "pointer" }}>Report User</p>
          {modLvl > 0 ? <p className="dropdown-item mb-0" onClick={() => props.clearReports("users", props.userId)} style={{ cursor: "pointer" }}>Clear Reports (Current: {props.user.reports ? props.user.reports : 0})</p> : null}
          {modLvl > 1 ? <p className="dropdown-item mb-0" onClick={() => props.setModerationLevel(props.userId, 0)} style={{ cursor: "pointer" }}>Set Moderation Level: User</p> : null}
          {modLvl > 1 ? <p className="dropdown-item mb-0" onClick={() => props.setModerationLevel(props.userId, 1)} style={{ cursor: "pointer" }}>Set Moderation Level: Mod</p> : null}
          {modLvl > 2 ? <p className="dropdown-item mb-0" onClick={() => props.setModerationLevel(props.userId, 2)} style={{ cursor: "pointer" }}>Set Moderation Level: Admin</p> : null}
          {modLvl > 0 ? <p className="dropdown-item mb-0" onClick={() => props.resetPfp(props.userId)} style={{ cursor: "pointer" }}>Reset Profile Picture</p> : null}
        </div>
      </div>
    )
  }
  return (
    <div className="row" style={{
      borderStyle: 'solid',
      borderRadius: '8px',
      borderColor: '#5F5177',
      borderWidth: '2px',
      paddingBottom: '10px',
      paddingTop: '10px',
      paddingLeft: '20px',
      paddingRight: '20px'
    }}>
      <Link to={"/profile/" + props.user.username}>
        <ProfilePicture
          user={props.user}
          width="115px"
          height="115px"
          onclick="enlargeImg"
          style={{ boxShadow: "1px 1px 1px 1px #060508" }}
          setProfilePictureImage={props.setProfilePictureImage} />
        <span style={{ paddingLeft: "10px", fontSize: "2rem" }}>
          {props.user.username + " "}
          {props.user.verified ?
            <img src={check} alt={props.user.username + "verified"}
              style={{
                width: "1.8rem",
                height: "1.8rem",
              }} />
            : null}
        </span>
      </Link>
      <div className="ml-auto pr-3 dropdown">
        {checkOptions()}
      </div>
    </div>
  );
}

export default UserCard;
