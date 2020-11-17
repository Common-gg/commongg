import React, { useState } from "react";
function GameCardImage(props) {
    const [border, setBorder] = useState("card-img-top");
    const select = () => {
        if (border === "card-img-top") {
            setBorder("card-img-top" + " border border-success");
            props.setSelectedGames([...props.selectedGames, props.gameName]);
        } else {
            setBorder("card-img-top");

            let temp = props.selectedGames;
            temp = temp.filter(game=>game!==props.gameName);
            props.setSelectedGames(temp);
        }
    }
    return (
        <div>
            <label htmlFor={props.id} >
                <img src={props.currentImg}
                    alt={props.alt}
                    className={border}

                />
            </label>
            <button style={{ display: "none" }} id={props.id} onClick={select} />
        </div>
    );
}
export default GameCardImage;