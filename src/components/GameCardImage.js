import React, { useState } from "react";
function GameCardImage(props) {
    const [border, setBorder] = useState("card-img-top");
    const select = () => {
        if (border === "card-img-top") {
            setBorder("card-img-top" + " border border-success");
            props.setSelectedGames([...props.selectedGames, props.id]);
        } else {
            setBorder("card-img-top");

            let temp = props.selectedGames;
            temp = temp.filter(game=>game!==props.id);
            props.setSelectedGames(temp);
        }
    }
    return (
        <div>
            <label htmlFor={props.id} >
                <img src={props.currentImg}
                    alt={props.alt}
                    className={border}
                    style={{borderWidth: "3px !important"}}
                />
            </label>
            <button style={{ display: "none" }} id={props.id} onClick={select} />
        </div>
    );
}
export default GameCardImage;