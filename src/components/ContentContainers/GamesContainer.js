import React, { useEffect, useState } from 'react';
import GameCard from "../GameCard.js";

import TeamfightTactics from "../../images/games/Teamfight Tactics.jpg";
import CommonChat from "../../images/games/Common Chat.png";

function GamesContainer(props) {
    const [selectedGames, setSelectedGames] = useState([]);
    const [allGames, setAllGames] = useState([
        {
            title: "Common Chat",
            image: CommonChat
        },
        {
            title: "Teamfight Tactics",
            image: TeamfightTactics
        }
    ]);

    const modalStyle={
        position: "absolute",
        top: "170px"
    };

    function handleDoneClick() {
        props.storeUserGames(selectedGames);
    }

    return (
        <div className="ChooseGames" >
            <div className="container">
                <div className="row">
                    <div className="modal fade show" style={modalStyle} id="chooseGamesModal" tabIndex="-1" role="dialog" aria-labelledby="chooseGameModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="chooseGameModalLabel">edit your games</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="row">{allGames.map((game, i) => {
                                    return <GameCard
                                        key={i}
                                        gameTitle={game.title}
                                        gameImageSrc={game.image}
                                        index={i}
                                        selectedGames={selectedGames}
                                        setSelectedGames={setSelectedGames}
                                    />;
                                })}</div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleDoneClick}>done</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GamesContainer;