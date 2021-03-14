import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar.js';
import ContentContainer from '../components/ContentContainers/ContentContainer.js';
import GamesContainer from '../components/ContentContainers/GamesContainer.js';
import SearchBar from '../components/SearchBar.js';
import NotificationContainer from "../components/NotificationContainer.js";
import TopOfPageImage from "../images/icons/top 1.png";
import { useHistory, Link } from "react-router-dom";
import Imgix from 'react-imgix';
import { Modal } from "react-bootstrap";
import SignUp from "./SignUp.js";
import Login from "./Login.js";
import ReminderVerifyEmail from "./ReminderVerifyEmail.js";

function PageContainer(props) {

  const [numPostsToLoad, setNumPostsToLoad] = useState(10);
  const [backClicked, setBackClicked] = useState(false);
  const [numPostsLoaded, setNumPostsLoaded] = useState();
  const [lastPostRetrieved, setLastPostRetrieved] = useState(0);
  const [offSet, setOffSet] = useState(0, 0);
  const history = useHistory();
  const [modalImage, setModalImage] = useState({
    link: ""
  });
  const [profilePictureImage, setProfilePictureImage] = useState({
    link: ""
  });
  const [topButton, setTopButton] = useState(0);
  const [signUpShow, setSignUpShow] = useState();
  const [modalState, setModalState] = useState("");
  const [modalContent, setModalContent] = useState();

  const sticky = {
    position: "fixed"
  }
  const modalContentStyle = {
    color: "#BF9AFC",
    backgroundColor: "transparent",
    borderColor: "transparent"
  };
  const topOfPageButtonStyle = {
    visibility: "hidden",
    backgroundColor: "transparent",
    borderRadius: "50%",
    position: "relative",
    borderTop: "4rem"
  };
  const topOfPageImageStyle = {
    width: "5rem",
    height: "auto",
    position: "relative"
  }
  const signUpModalContentStyle = {
    color: "#BF9AFC",
    backgroundColor: "#2A2A2D",
    borderTop: "0",
    borderLeft: "0",
    borderRight: "0",
    borderBottom: "0",
  };
  const buttonStyle = {
    height: 40,
    width: 120,
    marginLeft: "auto",
    backgroundColor: "#BF9AFC",
    color: "#2A2A2D",
    border: "solid",
    borderRadius: "10px",
    borderColor: "#BF9AFC",
    borderWidth: "2px",
    cursor: "pointer"
  }

  useEffect(() => {
    if (!props.verifyEmail) return;
    if (props.verifyEmail === -1) {
      setModalState("VerifyEmail");
      setSignUpShow(true);
    }
  }, [props.verifyEmail])

  useEffect(() => {
    if (signUpShow === true && modalState === "") {
      setModalState("SignUp");
    }
  }, [signUpShow])

  useEffect(() => {
    if (modalState === "SignUp") {
      setModalContent(<div><br /><SignUp {...props} modal={true} setModalState={setModalState} /><br /></div>);
    } else if (modalState === "Login") {
      setModalContent(<div><br /><Login {...props} modal={true} setModalState={setModalState} /><br /></div>);
    } else if (modalState === "VerifyEmail") {
      setModalContent(<div><ReminderVerifyEmail {...props} hideSignUp={hideSignUp} /><br /></div>);
    }
  }, [modalState])

  useEffect(() => {
    if (backClicked) {
      setLastPostRetrieved(0);
      setBackClicked(false);
      history.goBack();
    }
  }, [backClicked]);

  const handleScroll = () => {
    let topButton = document.getElementById("topBtn");

    if (topButton !== null) {
      if (window.pageYOffset < 2000) {
        topButton.style.visibility = "hidden";
      } else {
        topButton.style.visibility = "visible";
      }
    }
  }

  const showSignUp = () => {
    setSignUpShow(true);
  }
  const hideSignUp = () => {
    setSignUpShow(false);
  }

  window.addEventListener('scroll', handleScroll);

  return (
    <div className="PageContainer">
      <GamesContainer {...props} />
      <Modal show={signUpShow} onHide={hideSignUp} className="SignUpModal" >
        <div className="modal-content" style={signUpModalContentStyle}>
          <div className="col-12">
            {modalContent}
          </div>
        </div>
      </Modal>
      <div className="modal fade show" id="enlargedImageModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document" style={{
          background: "rgba(0, 0, 0, 0) !important"
        }}>
          <div className="modal-content" style={modalContentStyle}>
            <Imgix
              src={modalImage.link}
              sizes="90vw"
              htmlAttributes={{
                alt: "post image",
                style: {
                  position: "absolute",
                  top: "45vh",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="modal fade show" id="enlargedProfilePicture" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document" style={{
          background: "rgba(0, 0, 0, 0) !important"
        }}>
          <div className="modal-content" style={modalContentStyle}>
            {profilePictureImage.link.includes('firebasestorage') ?
              <Imgix
                src={profilePictureImage.link}
                sizes="90vw"
                htmlAttributes={{
                  alt: "profile image",
                  style: {
                    position: "absolute",
                    top: "45vh",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "100%"
                  }
                }}
              />
              :
              <img
                src={profilePictureImage.link}
                alt="profile image"
                style={{
                  position: "absolute",
                  top: "45vh",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: "100%"
                }}
              >
              </img>
            }
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <br /><br />
        <div className="row">
          <div className="navContainer">
            <div style={sticky}>
              <NavigationBar currentUserId={props.currentUserId}
                currentUserInfo={props.currentUserInfo}
                signOut={props.signOut}
                allGames={props.allGames}
                setAllGames={props.setAllGames}
                setSignUpShow={setSignUpShow}
                setModalState={setModalState}
              />
              {/* <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> */}
            </div>
          </div>
          <div style={{ width: "34%" }}>
            <div className="text-center">
              <SearchBar search={props.search}
                allGames={props.allGames}
                setAllGames={props.setAllGames}
              />
              <br />
            </div>
            <ContentContainer {...props}
              lastPostRetrieved={lastPostRetrieved}
              setLastPostRetrieved={setLastPostRetrieved}
              setModalImage={setModalImage}
              setProfilePictureImage={setProfilePictureImage}
              offSet={offSet}
              setBackClicked={setBackClicked}
              setOffSet={setOffSet}
              setNumPostsToLoad={setNumPostsToLoad}
              numPostsToLoad={numPostsToLoad}
              setNumPostsLoaded={setNumPostsLoaded}
              numPostsLoaded={numPostsLoaded}
              topButton={topButton}
              showSignUp={showSignUp}
              hideSignUp={hideSignUp}
            />
          </div>
          {props.currentUserInfo !== undefined ? <div style={{ width: "33%" }}>
            <div style={sticky}>
              <NotificationContainer {...props} />
              <div style={{
                position: "absolute",
                bottom: "-2.5rem",
                left: "88%"
              }}>
                <button
                  className="btn btn-primary"
                  id="topBtn"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setTopButton(topButton + 1);
                  }}
                  style={topOfPageButtonStyle}>
                  <img src={TopOfPageImage}
                    style={topOfPageImageStyle} />
                </button>
              </div>
            </div>
          </div> : null}
        </div>
      </div>
    </div >
  );
}

export default PageContainer;
