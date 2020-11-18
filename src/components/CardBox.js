import Axios from 'axios';
import React, { useState } from 'react';
import GameCard from './GameCard.js'

function CardBox(props) {
  const [selectedGames, setSelectedGames] = useState([]);
  return (
    <div className="CardBox">
        <div className="mx-auto card" style={{ margin: "40px", maxWidth: "30%" }}>
          <div className="row" style={{ margin: "20px" }}>
            {props.games.map((game, i) => (
              <div className="col-6" key={i}>
                <GameCard key={i} game={game} index={i} setSelectedGames={setSelectedGames} selectedGames={selectedGames}/>
              </div>
            ))}
            <div className="col-4"></div>
            <button className="col-4 btn btn-info">
            Select Games
          </button>
          </div>
          
        </div>
    </div>
  );
}

export default CardBox;
