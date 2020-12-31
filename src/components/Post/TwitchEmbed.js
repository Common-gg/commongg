import React, { useState, useEffect } from "react";
import {TwitchClip} from 'react-twitch-embed';

function TwitchEmbed(props) {
  //only prop it takes is the things after the clip
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
      <TwitchClip clip={props.clip} parent={['localhost', 'common.gg']} width="100%" height="100%"/>
      </div>
    </div>
  );
}

export default TwitchEmbed;
