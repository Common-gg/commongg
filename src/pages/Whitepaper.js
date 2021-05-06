import React from "react";
import CommonLogoLarge from "../images/icons/logotextlarge 1.png";
function Whitepaper(props) {

    const styleCommonLogo = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2A2A2D",
        margin: "2rem 0"
    }

    function header1(text) {
        return (
            <div className="row">
                <p className="col" style={{ color: "white", fontSize: "3rem", backgroundColor: "transparent", fontWeight: "bold", margin: "2rem 0" }}> {text}</p>
            </div>
        );
    }

    function header2(text) {
        return (
            <div className="row">
                <p className="col" style={{ color: "white", fontSize: "2rem", backgroundColor: "transparent", fontWeight: "bold", marginBottom: "1.4rem" }}> {text}</p>
            </div>
        );
    }

    function header3(text) {
        return (
            <div className="row">
                <p className="col" style={{ color: "white", fontSize: "1.4rem", backgroundColor: "transparent", fontWeight: "bold", marginBottom: "1.4rem" }}> {text}</p>
            </div>
        );
    }

    function bodyText(text) {
        return (
            <div className="row">
                <p className="col-9" style={{ color: "white", fontSize: "1rem", backgroundColor: "transparent", }}>{text}</p>
            </div>
        );
    }

    function lineBreak() {
        return (
            <hr style={{ backgroundColor: '#BF9AFC', width: '90%', left: "5px" }} />
        )
    }

    function introText(text) {
        return(
            <p style={{ color: "white", fontSize: "1rem", backgroundColor: "transparent"}}>{text}</p>
        )
    }

    return (
        <div>
            <div className="container-fluid">
                <div>                                   {/* intro */}
                    <div style={styleCommonLogo}>
                        <img src={CommonLogoLarge} />
                    </div>
                    {lineBreak()}
                    <div className="row" style={{padding: "2rem 20vw"}}>
                        <div className="col-6">
                            {header2("Introduction")}
                            {introText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")}
                            {header3("[some bullet points]")}
                            {/*bulletPoints(["bp1", "bp2", "bp3"])*/}
                            <ul style={{lineHeight: "3rem"}}>
                                <li>bp1</li>
                                <li>bp2</li>
                                <li>bp3</li>
                            </ul>
                        </div>
                        <div className="col-6">
                            {header3("[put some image or sign up for download on this half]")}
                        </div>
                    </div>
                </div>
                {lineBreak()}
                <div style={{padding: "0 5vw"}}>        {/* Whitepaper */}
                    {header1("Common Whitepaper [Header 1]")}
                    {header2("Header 2")}
                    {header3("Header 3")}
                    {bodyText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")}
                    {header3("Header 3")}
                    {bodyText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")}
                </div>
            </div>
        </div>
    )
}
export default Whitepaper;