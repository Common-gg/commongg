import React from 'react';
import GameCardImage from "../components/GameCardImage.js";

function GameCard(props) {
    return (
        <div className="GameCard">
            <div className="card">
                <GameCardImage currentImg={props.game.box_art_url} gameName={props.game.name} alt={props.game.name + " image"} id={props.game.id} key={props.index} setSelectedGames={props.setSelectedGames} selectedGames={props.selectedGames}/>
            </div>
        </div>
    );
}

export default GameCard;
