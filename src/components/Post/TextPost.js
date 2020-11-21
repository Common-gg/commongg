import React from 'react';
import Text from '../Text.js';
import IconButton from '../IconButton.js';

function TextPost(props) {
  return (
    <div className="TextPost">
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
            <IconButton class="fa fa-comment-o" text={props.post.numComments}/>
          </div>
          <div className="col-2">
            <IconButton class="fa fa-share-alt" text=""/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextPost;
