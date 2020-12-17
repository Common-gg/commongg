import React, { useEffect, useState } from 'react';
import GameCard from "../components/GameCard.js";
import NavigationBar from '../components/NavigationBar.js';
import TeamfightTactics from "../images/games/Teamfight Tactics.jpg";
import CommonChat from "../images/games/Common Chat.png";

function ChooseGames(props) {
    const [modalState, setModalState] = useState("show d-block");
    const [selectedGames, setSelectedGames] = useState([]);
    const [gamesArr, setGamesArr] = useState([]);
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

    useEffect(() => {
        setGamesArr(allGames.map((game, i) => {
            console.log(game);
            return <GameCard key={i} gameTitle={game.title} gameImageSrc={game.image} index={i} selectedGames={selectedGames} setSelectedGames={setSelectedGames} />;
        }))
    }, [allGames]);

    return (
        <div className="ChooseGames" >
            <div className="container">
                <div className="row">
                    <div className="col-2 text-center">
                        <NavigationBar currentUserId={props.currentUserId} currentUserInfo={props.user} signOut={props.signOut} />
                    </div>
                    <div className={`modal fade ${modalState}`} id="chooseGamesModal" tabIndex="-1" role="dialog" aria-labelledby="chooseGameModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="chooseGameModalLabel">edit your games</h5>
                                </div>
                                <div className="row">{gamesArr}</div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button type="button" className="btn btn-primary" onClick={() => setModalState("d-none")}>done</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ChooseGames;