import React, { useState } from 'react';
import Text from '../components/Text.js'
import NavigationBar from '../components/NavigationBar.js';
import ContentContainer from '../components/ContentContainers/ContentContainer.js';
import GamesContainer from '../components/ContentContainers/GamesContainer.js';
import SearchBar from '../components/SearchBar.js';

function PageContainer(props) {

  const [search, setSearch] = useState();

  const sticky = {
    position: "fixed"
  }

  return (
    <div className="PageContainer">
      <GamesContainer {...props} />
      <div className="container-fluid">
        <br /><br />
        <div className="row">
        <div className="col-xl-2 col-lg-1 col-md-0 col-sm-0"></div>
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-1 col-4">
            <div style={sticky}>
              <NavigationBar currentUserId={props.currentUserId} currentUserInfo={props.currentUserInfo} signOut={props.signOut} allGames={props.allGames} setAllGames={props.setAllGames}/>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-8">
            <div className="text-center">
              <SearchBar track={setSearch} search={props.search} allGames={props.allGames} setAllGames={props.setAllGames}/>
              <br />
            </div>
            <ContentContainer {...props} />
          </div>
          <div className="col-xl-4 col-lg-3 col-md-2 col-sm-1 col-0">
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
