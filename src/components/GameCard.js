import React from 'react';
import GameCardImage from "../components/GameCardImage.js";

function GameCard(props) {
    return (
        <div className="GameCard">
            <div className="card">
                <GameCardImage currentImg={props.game.img} gameName={props.game.name} alt={props.game.name + " image"} id={"Card Image " + props.index} key={props.index} setSelectedGames={props.setSelectedGames} selectedGames={props.selectedGames}/>
            </div>
        </div>
    );
}

export default GameCard;
