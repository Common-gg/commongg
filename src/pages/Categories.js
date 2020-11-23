import React, { useEffect, useState } from 'react';
import Input from '../components/Input.js';
import Button from '../components/Button.js';
import CardBox from '../components/CardBox.js';

function Categories(props) {
  const [games, setGames] = useState([]);
  const [twitchAPICallCount, setTwitchAPICallCount] = useState(0);

  useEffect(() => {
    // clean up controller
    let isSubscribed = true;
    props.Twitch.validate(process.env.TWITCH_VALIDATE_URL, props.twitchToken, (res, err) => {
      if(res === "no token") {
        setTwitchAPICallCount(twitchAPICallCount+1);
        return;
      }
      props.Twitch.getTopGames(process.env.GET_TOP_GAMES, props.twitchToken, (resTopGames) => {
        if (isSubscribed) {
          let topGames = resTopGames.body.data;
          const filterIds = ["509658", "26936"];
          topGames = topGames.filter(game => {
            let tempBool = true;
            filterIds.forEach(id => {
              if (game.id === id) {
                tempBool = false;
              }
            })

            let sizeInd = game.box_art_url.indexOf("{width}");
            let subStr = game.box_art_url.substring(0, sizeInd);
            game.box_art_url = subStr + "285x380.jpg";
            return tempBool;
          })
          setGames(topGames);
        }
      });
    })
    return () => (isSubscribed = false)
  }, [twitchAPICallCount]);

  return (
    <div className="Categories">
      <CardBox games={games} storeUserGames={props.storeUserGames} />
    </div>
  );
}

export default Categories;
