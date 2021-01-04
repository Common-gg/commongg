import React, { useEffect, useState } from 'react';
import Text from '../components/Text.js'
import NavigationBar from '../components/NavigationBar.js';
import ContentContainer from '../components/ContentContainers/ContentContainer.js';
import GamesContainer from '../components/ContentContainers/GamesContainer.js';
import SearchBar from '../components/SearchBar.js';

function PageContainer(props) {

  const [search, setSearch] = useState();
  const [modalImage, setModalImage] = useState({
    link: "",
    height: "0px",
    width: "0px"
  });

  const sticky = {
    position: "fixed"
  }
  const modalContentStyle = {
    color: "#BF9AFC",
    backgroundColor: "transparent",
    borderColor: "transparent"
  };

  useEffect(() => {
    setModalImage(modalImage);
  }, [modalImage])

  return (
    <div className="PageContainer">
      <GamesContainer {...props} />
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
              <SearchBar track={setSearch} search={props.search} allGames={props.allGames} setAllGames={props.setAllGames} />
              <br />
            </div>
            <ContentContainer {...props} setModalImage={setModalImage} />
            <div className="modal fade show" id="enlargedImageModal" tabIndex="-1" role="dialog"
              aria-labelledby="chooseGameModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document" style={{
                marginTop: (window.innerHeight - modalImage.height) / 2 + "px",
                width: modalImage.width * 1.5 + "px",
                height: modalImage.height * 1.5 + "px",
                background: "rgba(0, 0, 0, 0) !important"
              }}>
                <div className="modal-content" style={modalContentStyle}>
                  <img
                    src={modalImage.link}
                    alt="no image"
                    style={{
                      width: modalImage.width * 1.5 + "px",
                      height: modalImage.height * 1.5 + "px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-3 col-md-1 col-sm-0 col-0">
            <div style={sticky}>
              <Text text="ADS GO HERE TO MAKE $$ YEP" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageContainer;
