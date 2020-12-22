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
    const modalContentStyle = {
        color: "#BF9AFC",
        backgroundColor: "#202020",

    }
    const modalHeaderStyle = {
        borderBottom: "0 none",
    }
    const buttonStyle = {
        backgroundColor: "transparent",
        color: "#BF9AFC",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px",
    }
    function handleDoneClick() {
        props.storeUserGames(selectedGames);
    }

    return (
        <div className="ChooseGames" >
            <div className="container">
                <div className="row">
                    <div className="modal fade show" id="chooseGamesModal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content" style={modalContentStyle}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className="modal-header" style={modalHeaderStyle}>
                                    </div>
                                    <h5 className="modal-title" id="chooseGameModalLabel">edit your games</h5>
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
                                    <button style={buttonStyle} type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleDoneClick}>done</button>
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