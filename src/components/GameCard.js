import React, { useState, useEffect } from 'react';
import gameSelect from "../images/icons/gameselect.png";

function GameCard(props) {
    const [selected, setSelected] = useState("none");

    //if the props passed down a setSelected use it
    useEffect(() => {
        if (props.selectedGames.includes(props.index)) {
            setSelected("block");
        }
    }, [props.selectedGames, props.index])

    const select = () => {
        if (selected === "none") {
            setSelected("block");
            props.setSelectedGames([...props.selectedGames, props.index]);
        } else {
            setSelected("none");
            let temp = props.selectedGames;
            temp = temp.filter(allGames => allGames !== props.index);
            props.setSelectedGames(temp);
        }
    }

    return (
        <div className="col-2" style={{ margin: "30px" }} >
            <div className="GameCard" id={"GameCard " + props.index}>
                <div className="col-2" >
                    <label htmlFor={"GameCardButton " + props.index}>
                        <div key={props.index}>
                            <img src={props.gameImageSrc}
                                alt={props.gameTitle + " Alt"}
                                style={{
                                    width: "100",
                                    height: "150px",
                                    borderWidth: "8px !important",
                                    borderRadius: "10px",
                                    cursor: "pointer"
                                }} />
                            <img src={gameSelect}
                                alt={props.gameTitle + " Alt"}
                                style={{
                                    width: "102",
                                    height: "152px",
                                    borderWidth: "8px !important",
                                    display: selected,
                                    position: "absolute",
                                    top: "0px"
                                }} />
                        </div>
                    </label>
                    <button style={{ display: "none" }} id={"GameCardButton " + props.index} onClick={select} />
                </div>
            </div>
        </div>
    );
}


export default GameCard;
