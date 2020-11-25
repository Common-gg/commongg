import React from 'react';
import Text from '../components/Text.js'
import Input from '../components/Input.js';
import TextPost from '../components/Post/TextPost.js';
import VideoPost from '../components/Post/VideoPost.js';
import ImagePost from '../components/Post/ImagePost.js';
import CreatePostModal from '../components/Post/CreatePostModal.js';

function Feed(props) {

    const textPost1 = {
        user: "influrrier",
        time: "3h ago",
        title: "THIS GAME IS TOO FUN",
        text: "please help me\nI AM ADDICTED TO GENSHIN. It's taking over my life XD\n\nwatch me struggle ON STREAM and also help me learn how to get better.",
        /*figure out new line in text*/
        likes: 125765,
        dislikes: 1109,
        numComments: 1098
    }

    const videoPost1 = {
        user: "avni",
        time: "3h ago",
        title: "epic gamer moment",
        link: "https://www.youtube.com/embed/8YBiBlsXFp8",
        text: "i am the greatest league of legends player in the whole entire world #LFT",
        likes: 3200,
        dislikes: 350,
        numComments: 1400
    }

    const imagePost1 = {
        user: "Sonikzo",
        time: "4h ago",
        title: "im beautiful",
        link: "https://i.imgflip.com/skv3y.jpg",
        text: "dms are open",
        likes: 3200,
        dislikes: 350,
        numComments: 1400
    }

    return (
        <div className="Feed">
            <div className="container"> {/* use "container-fluid" to make it fill entire screen*/}
                <div className="row">
                    <div className="col-lg-2">
                        <Text text="profile" />
                        <Text text="home" />
                        <Text text="following" />
                        <Text text="trending" />
                        {props.currentUserInfo.games.map(game => {
                            return <Text text={game} key={game} />
                        })}
                    </div>
                    <div className="col-lg-7">
                        <Input type="search" placeholder="search" />
                        <br />
                        <CreatePostModal/>
                        <br />
                        <TextPost post={textPost1} />
                        <br />
                        <VideoPost post={videoPost1} />
                        <br />
                        <ImagePost post={imagePost1} />
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
