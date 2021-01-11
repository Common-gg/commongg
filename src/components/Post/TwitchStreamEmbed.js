import React from "react";

function TwitchStreamEmbed(props) {
  return (
    <iframe src={"https://player.twitch.tv/?channel=" + props.channel + "&parent=localhost&parent=common.gg&parent=common-gg.web.app&autoplay=false"}
      frameborder="0"
      allowfullscreen="true"
      scrolling="no"
      height="300px"
      width="100%">
    </iframe>
  );
}

export default TwitchStreamEmbed;
