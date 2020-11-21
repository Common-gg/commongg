import React from 'react';

function Video(props) {
  return (
    <div className="Video">
          <div class="embed-responsive embed-responsive-16by9">
              <iframe class="embed-responsive-item" src={props.src} allowfullscreen></iframe>
          </div>
    </div>
  );
}

export default Video;
