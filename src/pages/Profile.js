import React, { useState, useEffect } from "react";
import Text from '../components/Text.js';
import Post from '../components/Post/Post.js';

function Profile(props) {

  const [user, setUser] = useState({ profile: [], games: [] });

  useEffect(() => {
    props.getUser(setUser);
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const isUser = () => { //TODO - hide follow button if checked
    if (props.currentUserInfo.email === props.user.email) {
      return true;
    } else {
      return false;
    }
  }

  const isFollowing = () => { //TODO - change button text to follow/following

  }

  let userPosts = [
    {
      type: "text",
      user: "carrot",
      time: "3h ago",
      title: "THIS GAME IS TOO FUN",
      text: "please help me\nI AM ADDICTED TO GENSHIN. It's taking over my life XD\n\nwatch me struggle ON STREAM and also help me learn how to get better.",
      likes: 125765,
      dislikes: 1109,
      numComments: 1098
    },
    {
      type: "video",
      user: "carrot",
      time: "3h ago",
      title: "epic gamer moment",
      link: "https://www.youtube.com/embed/8YBiBlsXFp8",
      text: "i am the greatest league of legends player in the whole entire world #LFT",
      likes: 3200,
      dislikes: 350,
      numComments: 1400
    },
    {
      type: "image",
      user: "carrot",
      time: "4h ago",
      title: "im beautiful",
      link: "https://i.imgflip.com/skv3y.jpg",
      text: "dms are open",
      likes: 3200,
      dislikes: 350,
      numComments: 1400
    }
  ]

  return (
    <div className="Profile">

      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <Text text="profile" />
            <Text text="home" />
            <Text text="following" />
            <Text text="trending" />
            {user.games.map(game => {
              return <Text text={game} key={game} />
            })}
          </div>
          <div className="col-lg-7">
            <div className="row">
              <div className="col-lg-4">
                <img src={user.profile.profile_picture} alt="Avatar" width="150px" />
              </div>
              <div className="col-lg-6">
                <Text text={user.profile.username} />
                <Text text="About Me: put bio here" />
                <Text text="Following: put follower num here" />
                <Text text="Followers: put follower num here" />
              </div>
              <div className="col-lg-2">
                <button type="button" className="btn btn-primary">
                  Follow
                </button>
              </div>
            </div>
            <div className="row">
              <Text text="Games: (figure out how to replace the numbers with games)" />
              <div className="container testimonial-group">
                <div className="row text-center">
                  {user.games.map(game => {
                    return <div className="col-2">{game}</div>
                  })}
                </div>
              </div>
            </div>
            {userPosts.map(post => {
              return <Post post={post} />
            })}
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
