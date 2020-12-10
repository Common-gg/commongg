import Axios from 'axios';
import React, { useState } from 'react';
import GameCard from './GameCard.js'

function CardBox(props) {
  const [selectedGames, setSelectedGames] = useState([]);
  return (
    <div className="CardBox">
      <div className="mx-auto card" style={{
        margin: "40px",
        maxWidth: "30%",
        backgroundColor: "#292823",
        borderRadius: "10px",
        boxShadow: "-1px 10px 250px 1px #171421"
      }}>
        <div className="row" style={{ margin: "20px" }}>
          {props.games.map((game, i) => (
            <div className="col-6" key={i}>
              <GameCard key={i} game={game} index={i} setSelectedGames={setSelectedGames} selectedGames={selectedGames} />
            </div>
          ))}
          <div className="col-4"></div>
          <button onClick={() => props.storeUserGames(selectedGames)} className="col-4 btn btn-info">
            Select Games
          </button>
        </div>

      </div>
    </div>
  );
}

export default CardBox;
