import React from 'react';
import Text from '../Text.js';
import Video from '../Video.js'; //NOT WORKING, SO JUST USING HTML IN VIDEOPOST CLASS
import IconButton from '../IconButton.js';

function VideoPost(props) {
  return (
    <div className="VideoPost">
        {/*<div> 
            <Text text={props.post.user}/>
            <Text text={props.post.time}/>
            <Text text={props.post.title}/>
            <Video link={props.post.link}/>
            <Text text={props.post.text}/>
        </div>*/}
        <div className="container">
        <div className="row">
          <Text text={props.post.user} />
        </div>
        <div className="row">
          <Text text={props.post.time} />
        </div>
        <div className="row">
          <Text text={props.post.title} />
        </div>
        <div className="row">
          <div class="embed-responsive embed-responsive-16by9">
              <iframe class="embed-responsive-item" src={props.post.link} allowfullscreen></iframe>
          </div>
        </div>
        <div className="row">
          <Text text={props.post.text} />
        </div>
        <div className="row">
          <div className="col-2">
            <IconButton class="fa fa-smile-o" text={props.post.likes} />
          </div>
          <div className="col-2">
            <IconButton class="fa fa-frown-o" text={props.post.dislikes} />
          </div>
          <div className="col-4">

          </div>
          <div className="col-2">
            <IconButton class="fa fa-comment-o" text={props.post.numComments} />
          </div>
          <div className="col-2">
            <IconButton class="fa fa-share-alt" text="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPost;
