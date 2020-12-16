import React, { useState, useEffect } from "react";
import Text from '../Text.js';
import Image from '../Image.js';
import IconButton from '../IconButton.js';

function ImagePost(props) {

  const [author, setAuthor] = useState({ profile: "" });

  useEffect(() => {
    props.getUser(props.post.author, setAuthor)
  }, [])

  return (
    <div className="ImagePost">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Text text={author.profile.username} />
            <Text text={new Date(props.post.timestamp).toLocaleDateString("en-US") + " @ " + new Date(props.post.timestamp).toLocaleTimeString("en-US")} />
            <Text text={props.post.title} />
            <Image src={props.post.link} />
            <Text text={props.post.text} />
          </div>
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

export default ImagePost;
