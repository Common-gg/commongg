import React from 'react';
import GameCard from './GameCard.js'

function CardBox(props) {
  return (
    <div className="CardBox">
        {props.games.map((game, i) => (
            <GameCard key={i} game={game}/>
        ))}
    </div>
  );
}

export default CardBox;
