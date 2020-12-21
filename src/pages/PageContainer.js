import React, { useState } from 'react';
import Text from '../components/Text.js'
import NavigationBar from '../components/NavigationBar.js';
import ContentContainer from '../components/ContentContainers/ContentContainer.js';
import GamesContainer from '../components/ContentContainers/GamesContainer.js';
import SearchBar from '../components/SearchBar.js';

function PageContainer(props) {

  const [search, setSearch] = useState();

  return (
    <div className="PageContainer">
      <div className="container-fluid">
        <br /><br />
        <div className="row">
          <div className="col-1"></div>
          <div className="col-2">
            <NavigationBar currentUserId={props.currentUserId} currentUserInfo={props.currentUserInfo} signOut={props.signOut} />
          </div>
          <div className="col-6">
            <GamesContainer {...props} />
            <div className="text-center">
              <SearchBar track={setSearch} search={props.search} />
              <br />
            </div>
            <ContentContainer {...props} />
          </div>
          <div className="col-2">
            <Text text="ADS GO HERE TO MAKE $$ YEP" />
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
}

export default PageContainer;