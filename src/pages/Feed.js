import React, { useEffect, useState } from 'react';
import Text from '../components/Text.js'
import NavigationBar from '../components/NavigationBar.js';
import FeedContainer from '../components/ContentContainers/FeedContainer.js';

function Feed(props) {

    return (
        <div className="Feed">
            <div className="container">
                <div className="row">
                    <div className="col" style= {{ width: "25%",}}>
                        <NavigationBar currentUserId={props.currentUserId} currentUserInfo={props.currentUserInfo} signOut={props.signOut} allGames={props.allGames} setAllGames={props.setAllGames}/>
                    </div>
                    <div className="col" style={{ width: "50%"}}>
                        <FeedContainer currentUserId={props.currentUserId} setCreatePost={props.setCreatePost} storeImage={props.storeImage} />
                    </div>
                    <div className="col" style={{ width: "25%"}}>
                        <Text text="PUT ADS HERE TO MAKE $$ YEP" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feed;
