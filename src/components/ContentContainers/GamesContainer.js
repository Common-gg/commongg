import React, { useEffect, useState } from 'react';
import GameCard from "../GameCard.js";

function GamesContainer(props) {
    const [selectedGames, setSelectedGames] = useState([]);
    const [modalDismiss, setModalDismiss] = useState("");
    const [clicked, setClicked] = useState(false);

    //on mount load the games that are already in the user profile
    useEffect(() => {
        //if the user's games are not null or undefined preselect it
        if(props.currentUserInfo === undefined) return;
        if (props.currentUserInfo.games != null) {
            setSelectedGames(props.currentUserInfo.games)
        }
    }, [props.currentUserInfo])

    //this switches the state for whether modal can be closed based on number of games
    useEffect(() => {
        if (selectedGames.length > 0) {
            setModalDismiss("modal");
            setClicked(false);
        } else {
            setModalDismiss("");
        }
    }, [selectedGames])

    const modalContentStyle = {
        color: "#BF9AFC",
        backgroundColor: "#2A2A2D",
        borderRadius: "10px",
        boxShadow: "-1px 7px 25px 1px #060508",
    }

    const modalStyle = {
        position: "absolute",
        top: "170px",
        left: "15px",
    };

    const buttonStyle = {
        backgroundColor: "transparent",
        color: "#BF9AFC",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px",
    }

    function handleDoneClick() {
        if (selectedGames.length > 0) {
            props.storeUserGames(selectedGames);
        } else {
            setClicked(true);
        }

    }

    return (
        <div className="ChooseGames">
            <div className="container">
                <div className="row">

                    <div className="modal fade show"
                        style={modalStyle}
                        id="chooseGamesModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="chooseGameModalLabel"
                        aria-hidden="true">

                        <div className="modal-dialog" role="document">
                            <div className="modal-content" style={modalContentStyle}>
                                <div style={{ display: 'flex', justifyContent: 'center', }}>
                                    <h5 className="modal-title"
                                        id="chooseGameModalLabel"
                                        style={{
                                            marginTop: "30px",
                                            textAlign: "center",
                                            fontSize: "30px"
                                        }}>
                                        Edit Your Games</h5>
                                </div>
                                <div className="row mx-auto">{props.allGames.map((game, i) => {
                                    return <GameCard
                                        key={i}
                                        gameTitle={game.title}
                                        gameImageSrc={game.image}
                                        index={i}
                                        selectedGames={selectedGames}
                                        setSelectedGames={setSelectedGames}
                                        style={{ backgroundColor: "#2A2A2D" }}
                                    />;
                                })}</div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button style={buttonStyle} 
                                    type="button" 
                                    className="btn btn-primary" 
                                    data-dismiss={modalDismiss} 
                                    onClick={handleDoneClick}>Done</button>
                                </div>
                                <br />
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {clicked ? <p style={{ color: "#F34D4D" }}>must pick at least one game</p> : ""}
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