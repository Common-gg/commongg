import React from 'react';

function Video(props) {
  return (
    <div className="Video">
          <div className="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item" src={props.src} allowFullScreen></iframe>
          </div>
    </div>
  );
}

export default Video;
