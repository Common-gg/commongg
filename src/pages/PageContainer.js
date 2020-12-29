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
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4">
            <div style={sticky}>
              <NavigationBar currentUserId={props.currentUserId} currentUserInfo={props.currentUserInfo} signOut={props.signOut} allGames={props.allGames} setAllGames={props.setAllGames}/>
            </div>
          </div>
          <div className="col" style={{flex: '0 0 530px'}}>
            <div className="text-center">
              <SearchBar track={setSearch} search={props.search} allGames={props.allGames} setAllGames={props.setAllGames}/>
              <br />
            </div>
            <ContentContainer {...props} />
          </div>
          <div className="col-3">
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
