import React from 'react';
import Text from '../Text.js';
import IconButton from '../IconButton.js';

function TextPost(props) {

  const convertNum = (val) => {
    let editedVal = val;
    if(editedVal > 1000000){
      editedVal = Math.round(val/100000)/10;
      return (editedVal + "M");
    }
    if (editedVal > 1000) {
      editedVal = Math.round(val/100)/10;
      return (editedVal + "K");
    } else {
      return editedVal;
    }
  }
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
            <IconButton class="fa fa-smile-o" text={convertNum(props.post.likes)} />
          </div>
          <div className="col-2">
            <IconButton class="fa fa-frown-o" text={convertNum(props.post.dislikes)} />
          </div>
          <div className="col-4">

          </div>
          <div className="col-2">
            <IconButton class="fa fa-comment-o" text={convertNum(props.post.numComments)} />
          </div>
          <div className="col-2">
            <IconButton class="fa fa-share-alt" text="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextPost;
