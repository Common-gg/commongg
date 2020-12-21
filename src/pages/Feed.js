import React, { useEffect, useState } from 'react';
import Text from '../components/Text.js'
import NavigationBar from '../components/NavigationBar.js';
import FeedContainer from '../components/ContentContainers/FeedContainer.js';

function Feed(props) {

    return (
        <div className="Feed">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <NavigationBar currentUserId={props.currentUserId} currentUserInfo={props.currentUserInfo} signOut={props.signOut}/>
                    </div>
                    <div className="col-lg-7">
                        <FeedContainer currentUserId={props.currentUserId} setCreatePost={props.setCreatePost} storeImage={props.storeImage} />
                    </div>
                    <div className="col-lg-3">
                        <Text text="PUT ADS HERE TO MAKE $$ YEP" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feed;
