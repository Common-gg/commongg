import React from 'react';

function GameCard(props) {
    return (
        <div className="GameCard">
            <div class="card" style={{width: "18rem"}}>
                <img class="card-img-top" src={props.game.img} alt={props.game.name + " image"} />
                <div class="card-body">
                    <h5 class="card-title">{props.game.name}</h5>
                </div>
            </div>
        </div>
    );
}

export default GameCard;
