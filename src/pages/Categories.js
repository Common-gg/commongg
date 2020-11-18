import React, { useEffect, useState } from 'react';
import Input from '../components/Input.js';
import Button from '../components/Button.js';
import CardBox from '../components/CardBox.js';

function Categories(props) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    props.Twitch.getToken(process.env.GET_TOKEN, (res) => {
      console.log(res);
      props.Twitch.getTopGames(process.env.GET_TOP_GAMES, res.body.access_token, (resTopGames) => {
        let topGames = resTopGames.body.data;
        const filterIds = ["509658", "26936"];
        topGames = topGames.filter(game => {
          let tempBool = true;
          filterIds.forEach(id => {
            if(game.id === id){
              tempBool = false;
            }
          })
          if(!tempBool) {
            console.log(game);
          }

          //"https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-{width}x{height}.jpg"
          // 150px x 100px
          let sizeInd = game.box_art_url.indexOf("{width}");
          let subStr = game.box_art_url.substring(0,sizeInd);
          game.box_art_url = subStr + "285x380.jpg";
          console.log(game.box_art_url);
          return tempBool;
        })
        setGames(topGames);
      });
    })
  }, []);

  return (
    <div className="Categories">
      <CardBox games={games}/>
    </div>
  );
}

export default Categories;
