import React from 'react';

function GameCard(props) {
    return (
        <div className="GameCard">
            <div className="card" style={{width: "18rem"}}>
                <img className="card-img-top" src={props.game.img} alt={props.game.name + " image"} />
                <div className="card-body">
                    <h5 className="card-title">{props.game.name}</h5>
                </div>
            </div>
        </div>
    );
}

export default GameCard;
