import React, { useState, useEffect } from "react";

function TwitchClipEmbed(props) {
  return (
    <iframe src={"https://clips.twitch.tv/embed?clip=" + props.clip + "&parent=localhost&parent=common.gg&parent=common-gg.web.app&autoplay=false"}
      frameborder="0"
      allowfullscreen="true"
      scrolling="no"
      height="300px"
      width="100%">
    </iframe>
  );
}

export default TwitchClipEmbed;
