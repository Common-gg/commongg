import React, { useState } from 'react';
import FeedType from '../FeedType.js';
import CreatePostModal from '../Post/CreatePostModal.js';
import * as Icon from 'react-bootstrap-icons';

function FeedContainer(props) {

  const [postRefresh, setPostRefresh] = useState(0);
  const updatePostRefresh = () => {
    setPostRefresh(postRefresh + 1);
  }
  const buttonStyle = {
    color: "#BF9AFC",
    backgroundColor: "#2A2A2D",
    border: "2px solid #BF9AFC",
    width: "100%",
    textAlign: "left",
    borderRadius: "8px",
    cursor: "pointer"
  };

  return (
    <div>
      {props.currentUserInfo !== undefined ?
        <CreatePostModal
          firebaseTimeStamp={props.firebaseTimeStamp}
          currentUserId={props.currentUserId}
          storeImage={props.storeImage}
          currentUserInfo={props.currentUserInfo}
          updatePostRefresh={updatePostRefresh}
          updatePost={props.updatePost}
          allGames={props.allGames}
          setAllGames={props.setAllGames}
        /> :
        <div>
          <button type="button" style={buttonStyle} className="btn btn-primary" onClick={props.showSignUp}>
            <Icon.PlusCircle
              alt="post button"
              style={{
                width: "25px",
                height: "25px",
                marginRight: ".5rem"
              }} />
            Make a Post
          </button>
          <br />
        </div>}
      <br />
      <FeedType {...props} postRefresh={postRefresh} />
    </div>
  );
}

export default FeedContainer;
