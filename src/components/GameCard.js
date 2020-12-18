import React, { useState } from 'react';

function GameCard(props) {
    const [border, setBorder] = useState("");

    const select = () => {
        if (border === "") {
            setBorder("border border-success");
            props.setSelectedGames([...props.selectedGames, props.index]);
        } else {
            setBorder("");

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
                                className={border}
                                alt={props.gameTitle + " Alt"}
                                style={{ width: "100", height: "150px", borderWidth: "8px !important" }} />
                        </div>
                    </label>
                    <button style={{ display: "none" }} id={"GameCardButton " + props.index} onClick={select} />
                </div>
            </div>
        </div>
    );
}


export default GameCard;
