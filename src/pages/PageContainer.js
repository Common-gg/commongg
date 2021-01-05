import React, { useEffect, useState, useRef } from 'react';
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

  const modalImageRef = useRef();

  const sticky = {
    position: "fixed"
  }
  const modalContentStyle = {
    color: "#BF9AFC",
    backgroundColor: "transparent",
    borderColor: "transparent"
  };

  useEffect(() => {
    const wRatio = (window.innerWidth * .9) / modalImage.width;
    const hRatio = (window.innerHeight * .9) / modalImage.height;
    if(wRatio >= 1 && hRatio >= 1) return;
    if(wRatio <= hRatio) {
      setModalImage({
        ...modalImage,
        width: modalImage.width * wRatio,
        height: modalImage.height * wRatio
      })
    } else {
      setModalImage({
        ...modalImage,
        width: modalImage.width * hRatio,
        height: modalImage.height * hRatio
      })
    }
  }, [modalImage])

  return (
    <div className="PageContainer">
      <GamesContainer {...props} />
      <div className="modal fade show" id="enlargedImageModal" tabIndex="-1" role="dialog"
              aria-labelledby="chooseGameModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document" style={{
                marginTop: (window.innerHeight - modalImage.height)/2 + "px",
                marginLeft: (window.innerWidth - modalImage.width)/2 + "px",
                background: "rgba(0, 0, 0, 0) !important"
              }}>
                <div className="modal-content" style={modalContentStyle}>
                {console.log(modalImage)}
                  <img
                    id="modalImage"
                    src={modalImage.link}
                    alt="no image"
                    style={{
                      width: modalImage.width,
                      height: modalImage.height,
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
              <SearchBar track={setSearch} search={props.search} allGames={props.allGames} setAllGames={props.setAllGames} />
              <br />
            </div>
            <ContentContainer {...props} setModalImage={setModalImage} />
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
