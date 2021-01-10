import React from "react";
import YouTube from "react-youtube";

function YoutubeEmbed(props) {
    const opts = {
        width: '100%',
        height: '300px',
        id: props.video + '_video',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        }
    };

    return (
        <YouTube videoId={props.video} opts={opts} />
    );
}

export default YoutubeEmbed;
