import React, { useEffect, useState, useRef } from 'react';
import Text from '../components/Text.js'
import NavigationBar from '../components/NavigationBar.js';
import ContentContainer from '../components/ContentContainers/ContentContainer.js';
import GamesContainer from '../components/ContentContainers/GamesContainer.js';
import SearchBar from '../components/SearchBar.js';
import NotificationContainer from "../components/NotificationContainer.js";
import TopOfPageImage from "../images/icons/top 1.png";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";

function PageContainer(props) {

  const [numPostsToLoad, setNumPostsToLoad] = useState(10);
  const [backClicked, setBackClicked] = useState(false);
  const [showClickOutsideCommentModal, setShowClickOutsideCommentModal] = useState(false);
  const [numPostsLoaded, setNumPostsLoaded] = useState();
  const [offSet, setOffSet] = useState(0, 0);
  const history = useHistory();
  const [modalImage, setModalImage] = useState({
    link: "",
    height: 1,
    width: 1
  });
  const [profilePictureImage, setProfilePictureImage] = useState({
    link: "",
    height: 1,
    width: 1
  });

  const sticky = {
    position: "fixed"
  }
  const topOfPageButtonStyle = {
    visibility: "visible",
    backgroundColor: "transparent",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "50%",
    position: "relative",
    top: "-1.6vh",
    left: "-1vw",
    borderTop: "4rem"
  };
  const topOfPageImageStyle = {
    width: "6rem",
    height: "2.5rem",
    position: "relative"
  }
  const modalContentStyle = {
    color: "#BF9AFC",
    backgroundColor: "#292833",
    borderTop: "0",
    borderLeft: "0",
    borderRight: "0",
    borderBottom: "0",
  }
  const modalHeaderStyle = {
    borderBottom: "0 none",
    textAlign: "center"
  }
  const buttonStyle = {
    height: 48,
    marginLeft: "auto",
    backgroundColor: "#BF9AFC",
    color: "#292833",
    border: "solid",
    borderRadius: "10px",
    borderColor: "#BF9AFC",
    borderWidth: "1px",
  }
  useEffect(() => {
    checkRatio(modalImage, setModalImage);
  }, [modalImage])

  useEffect(() => {
    checkRatio(profilePictureImage, setProfilePictureImage);
  }, [profilePictureImage]);

  useEffect(() => {
    if (backClicked) {
      setBackClicked(false);
      history.goBack();
    }
  }, [backClicked]);

  const checkRatio = (image, setImage) => {
    const wRatio = (window.innerWidth * .9) / image.width;
    const hRatio = (window.innerHeight * .9) / image.height;

    if (Math.min(wRatio, hRatio) >= 1) return;
    setImage({
      ...image,
      width: image.width * Math.min(wRatio, hRatio),
      height: image.height * Math.min(wRatio, hRatio)
    });
  }

  const clickOutsideModalContentStyle = {
    color: "#BF9AFC",
    backgroundColor: "#292833",
    borderTop: "0",
    borderLeft: "0",
    borderRight: "0",
    borderBottom: "0",
    width: "600px",
    height: "150px",
  }
  return (
    <div className="PageContainer">
      <GamesContainer {...props} />
      <Modal show={showClickOutsideCommentModal} style={{ marginRight: "5rem", marginTop: "5rem", zIndex: "99999" }
      } onHide={() => { setShowClickOutsideCommentModal(false) }}>
        <div className="modal-content" style={clickOutsideModalContentStyle}>
          <div className="modal-header" style={modalHeaderStyle}>
            <h5 className="modal-title" >You clicked outside the comment area. This box was to prevent you from losing your comment.</h5>
          </div>
          <div>
            <hr style={{ padding: "0", backgroundColor: '#5F5177', width: '90%' }} />
            <div style={{ display: "flex" }}>
              <button type="button" className="btn btn-primary" onClick={() => setShowClickOutsideCommentModal(false)} style={buttonStyle}>close</button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="modal fade show" id="enlargedImageModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document" style={{
          marginTop: (window.innerHeight - modalImage.height) / 2 + "px",
          marginLeft: (window.innerWidth - modalImage.width) / 2 + "px",
          background: "rgba(0, 0, 0, 0) !important"
        }}>
          <div className="modal-content" style={modalContentStyle}>
            <img
              src={modalImage.link}
              alt="no image"
              style={{
                width: modalImage.width + "px",
                height: modalImage.height + "px",
              }}
            />
          </div>
        </div>
      </div>
      <div className="modal fade show" id="enlargedProfilePicture" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document" style={{
          marginTop: (window.innerHeight - profilePictureImage.height) / 2 + "px",
          marginLeft: (window.innerWidth - profilePictureImage.width) / 2 + "px",
          background: "rgba(0, 0, 0, 0) !important"
        }}>
          <div className="modal-content" style={modalContentStyle}>
            <img
              id="modalImage"
              src={profilePictureImage.link}
              alt="no image"
              style={{
                width: profilePictureImage.width + "px",
                height: profilePictureImage.height + "px",
                borderRadius: "100%",
                objectFit: "scale-down"
              }}
            />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <br /><br />
        <div className="row">
          <div className="col-xl-2 col-lg-1 col-md-0 col-sm-0"></div>
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-4">
            <div style={sticky}>
              <NavigationBar currentUserId={props.currentUserId} currentUserInfo={props.currentUserInfo} signOut={props.signOut} allGames={props.allGames} setAllGames={props.setAllGames} />
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-8 col-8">
            <div className="text-center">
              <SearchBar search={props.search} allGames={props.allGames} setAllGames={props.setAllGames} />
              <br />
            </div>
            <ContentContainer {...props} setModalImage={setModalImage} setProfilePictureImage={setProfilePictureImage} offSet={offSet}
              setBackClicked={setBackClicked} setOffSet={setOffSet} setNumPostsToLoad={setNumPostsToLoad} numPostsToLoad={numPostsToLoad}
              setNumPostsLoaded={setNumPostsLoaded} numPostsLoaded={numPostsLoaded}
              showClickOutsideCommentModal={showClickOutsideCommentModal} setShowClickOutsideCommentModal={setShowClickOutsideCommentModal}
            />
          </div>
          <div className="col-xl-4 col-lg-3 col-md-1 col-sm-0 col-0">
            <div style={sticky}>
              <NotificationContainer {...props} />
              <div style={{ position: "absolute", bottom: "-2.5rem", right: "-7rem" }}>
                <button className="btn btn-primary" onClick={() => window.scrollTo(0, 0)} style={topOfPageButtonStyle}>
                  <img src={TopOfPageImage} style={topOfPageImageStyle} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageContainer;
