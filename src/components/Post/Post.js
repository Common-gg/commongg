import React, { useState, useEffect } from "react";
import Text from '../Text.js';
import PostFooter from './PostFooter.js'
import ProfilePicture from '../ProfilePicture.js';
import optionsIcon from '../../images/icons/options.png';
import { Link } from "react-router-dom";

function Post(props) {

  const [author, setAuthor] = useState({ profile: "" });

  useEffect(() => {
    props.getUser(props.post.author, setAuthor)
  }, [props.post]);

  function getStyle() {
    if (props.style === undefined) {
      return ({
        borderStyle: 'solid',
        borderRadius: '8px',
        borderColor: '#5F5177',
        borderWidth: '2px',
        paddingBottom: '0px',
        paddingLeft: '20px',
        paddingRight: '20px'
      });
    } else {
      return props.style;
    }
  }

  function deletePost() {
    console.log("delete")
  }

  function checkOptions() {
    if (props.currentUserId === props.post.author) {
      return (
      <div>
        <div id="dropdownMenuButton" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{background:"transparent"}}>
          <img src={optionsIcon} alt={"options"} style={{backgroundColor: "transparent"}} />        
        </div>
        <div class="dropdown-menu-right dropdown-menu" aria-labelledby="dropdownMenuButton">
          <p className="dropdown-item mb-0" onClick={()=>deletePost()} style={{cursor: "pointer"}}>Delete Post</p>
        </div>
      </div>
      )
    }
  }

  const checkType = () => {

    if (props.post.type === "text") {
      return
    } else if (props.post.type === "image") {
      return (
        <img
          src={props.post.link}
          alt="posted image"
          style={{
            width: "100%"
          }}
        />
      )
    }
    // Code to turn on video later!
    // else if (props.post.type === "video") {
    //   return (
    //     <video controls name="posted video"
    //       style={{
    //         width: "100%"
    //       }}>
    //       <source
    //         src={props.post.link}
    //       />
    //     </video>
    //   )
    // }
  }

 

  const showCategory = () => {
    if (props.showCategory !== undefined) {
      return (
        <div className="p-2">
          <Text text={props.post.category}
            style={{
              borderStyle: 'solid',
              borderWidth: '1px',
              borderRadius: '5px',
              height: '25px',
              color: '#BF9AFC',
              borderColor: '#BF9AFC'
            }} />
        </div>
      );
    }
  }

  return (
    <div className="Post" style={getStyle()}>
      <div className="container">
        <br />
        <div className="row">
          <div className="col-8 row">
            <div className="col-1">
              <ProfilePicture currentUserInfo={author} width="40px" height="40px" />
            </div>
            <div className="col-11 row" style={{ marginBottom: '5px', lineHeight: '4px' }}>
              <div className="col-1"></div>
              <div className="col-10">
                <br />
                <br />
                <Link to={"/profile/" + props.post.author} >
                  <Text text={author.username} />
                </Link>
                <Text text={new Date(props.post.timestamp).toLocaleTimeString("en-US",{hour: '2-digit', minute:'2-digit'}) + " - " + new Date(props.post.timestamp).toLocaleDateString("en-US")}
                  style={{ color: '#BF9AFC', fontSize: '12px' }}
                />     
              </div>
            </div>
          </div>
          <div className="ml-auto pr-3 dropdown">
            {checkOptions()}
          </div>          
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center flex-wrap">
              <div className="p-2"><Text text={props.post.title} style={{ fontSize: '32px' }} /></div>
              {showCategory()}
            </div>
            <Text text={props.post.text} style={{ fontSize: '18px' }} />
            {checkType()}
          </div>
        </div>
        <PostFooter {...props} />
      </div>
      <br />
    </div >
  );
}

export default Post;
