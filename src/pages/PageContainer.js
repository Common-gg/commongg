import React, { useState } from 'react';
import Text from '../components/Text.js'
import NavigationBar from '../components/NavigationBar.js';
import ContentContainer from '../components/ContentContainers/ContentContainer.js';
import GamesContainer from '../components/ContentContainers/GamesContainer.js';
import Input from '../components/Input.js';

function PageContainer(props) {

  const [search, setSearch] = useState();

  return (
    <div className="PageContainer">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <NavigationBar currentUserId={props.currentUserId} currentUserInfo={props.currentUserInfo} signOut={props.signOut} />
          </div>
          <div className="col-lg-7">
            <GamesContainer {...props} />
            <div className="text-center">
              <Input type="search" placeholder="search" track={setSearch} />
              <br />
            </div>
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
