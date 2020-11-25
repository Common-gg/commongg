import React from 'react';
import Image from '../components/Image.js';
import Text from '../components/Text.js'
import Button from '../components/Button.js'

function Profile(props) {

  let userPosts = {
    textPost1:{
      user: "carrot",
      time: "3h ago",
      title: "THIS GAME IS TOO FUN",
      text: "please help me\nI AM ADDICTED TO GENSHIN. It's taking over my life XD\n\nwatch me struggle ON STREAM and also help me learn how to get better.",
      likes: 125765,
      dislikes: 1109,
      numComments: 1098
    },
    videoPost1:{
      user: "carrot",
      time: "3h ago",
      title: "epic gamer moment",
      link: "https://www.youtube.com/embed/8YBiBlsXFp8",
      text: "i am the greatest league of legends player in the whole entire world #LFT",
      likes: 3200,
      dislikes: 350,
      numComments: 1400
    },
    imagePost1:{
      user: "carrot",
      time: "4h ago",
      title: "im beautiful",
      link: "https://i.imgflip.com/skv3y.jpg",
      text: "dms are open",
      likes: 3200,
      dislikes: 350,
      numComments: 1400
    }
  }

  return (
    <div className="Profile">

      <div className="container">
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
            <div className="row">
              <div className="col-lg-4">
                <img src={props.currentUserInfo.profile.profile_picture} alt="Avatar" width="150px" />
              </div>
              <div className="col-lg-8">
                <Text text="put name here" />
                <Text text="Following: put follower num here" />
                <Text text="Followers: put follower num here" />
              </div>
            </div>
            <div className="row">
              <Text text="Games: (figure out how to replace the numbers with games)" />
              <div class="container testimonial-group">
                <div class="row text-center">
                  <div class="col-2">1</div>
                  <div class="col-2">2</div>
                  <div class="col-2">3</div>
                  <div class="col-2">4</div>
                  <div class="col-2">5</div>
                  <div class="col-2">6</div>
                  <div class="col-2">7</div>
                  <div class="col-2">8</div>
                  <div class="col-2">9</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            column 3
        </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
