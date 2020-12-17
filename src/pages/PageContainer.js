import React from 'react';
import Text from '../components/Text.js'
import NavigationBar from '../components/NavigationBar.js';
import ContentContainer from '../components/ContentContainers/ContentContainer.js';

function PageContainer(props) {

  return (
    <div className="PageContainer">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <NavigationBar currentUserId={props.currentUserId} currentUserInfo={props.currentUserInfo} signOut={props.signOut} />
          </div>
          <div className="col-lg-7">
            <ContentContainer {...props} />
          </div>
          <div className="col-lg-3">
            <Text text="PUT ADS HERE TO MAKE $$ YEP" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageContainer;
