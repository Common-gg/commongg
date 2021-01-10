import React from "react";
import { TwitchPlayer } from 'react-twitch-embed';

function TwitchStreamEmbed(props) {
  const parent = {
    position: "relative",
    width: "100%",
    paddingBottom: "56%",
    float: "left",
    height: "0"
  };
  const child = {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: "0"
  };

  return (
    <div style={parent}>
      <div style={child}>
        <TwitchPlayer channel={props.channel} width="100%" height="100%" autoplay={false} />
      </div>
    </div>
  );
}

export default TwitchStreamEmbed;
