import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar.js';
import ContentContainer from '../components/ContentContainers/ContentContainer.js';
import GamesContainer from '../components/ContentContainers/GamesContainer.js';
import SearchBar from '../components/SearchBar.js';
import NotificationContainer from "../components/NotificationContainer.js";
import TopOfPageImage from "../images/icons/top 1.png";
import { useHistory } from "react-router-dom";
import Imgix from 'react-imgix';

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

  const sticky = {
    position: "fixed"
  }
  const modalContentStyle = {
    color: "#BF9AFC",
    backgroundColor: "transparent",
    borderColor: "transparent"
  };
  const topOfPageButtonStyle = {
    visibility: "visible",
    backgroundColor: "transparent",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "50%",
    position: "relative",
    top: "1vh",
    left: "-2vw",
    borderTop: "4rem"
  };
  const topOfPageImageStyle = {
    width: "6rem",
    height: "2.5rem",
    position: "relative"
  }

  useEffect(() => {
    if (backClicked) {
      setLastPostRetrieved(0);
      setBackClicked(false);
      history.goBack();
    }
  }, [backClicked]);

  return (
    <div className="PageContainer">
      <GamesContainer {...props} />
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
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <br /><br />
        <div className="row">
          <div style={{ maxWidth: "33.33%", width: "33.33%", paddingLeft: "10%", }}>
            <div style={sticky}>
              <NavigationBar currentUserId={props.currentUserId} currentUserInfo={props.currentUserInfo} signOut={props.signOut} allGames={props.allGames} setAllGames={props.setAllGames} />
            </div>
          </div>
          <div style={{ width: "33.33%" }}>
            <div className="text-center">
              <SearchBar search={props.search} allGames={props.allGames} setAllGames={props.setAllGames} />
              <br />
            </div>
            <ContentContainer {...props} lastPostRetrieved={lastPostRetrieved} setLastPostRetrieved={setLastPostRetrieved} setModalImage={setModalImage} setProfilePictureImage={setProfilePictureImage} offSet={offSet}
              setBackClicked={setBackClicked} setOffSet={setOffSet} setNumPostsToLoad={setNumPostsToLoad} numPostsToLoad={numPostsToLoad}
              setNumPostsLoaded={setNumPostsLoaded} numPostsLoaded={numPostsLoaded} />
          </div>
          <div style={{ width: "33.33%" }}>
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
