import React from "react";
import CommonLogoLarge from "../images/icons/logotextlarge 1.png";
import SignUpButton from "../components/SignUp/SignUpButton.js";
import ArrowRight from "../images/icons/arrowright white.png";
import DiscordLogo from "../images/icons/discord logo.png";
import TwitterLogo from "../images/icons/twitter logo.png";

function Whitepaper(props) {

    function navBarText(text) {
        return (
            <div className="row">
                <p className="col" style={{ color: "white", fontSize: "1.4rem", backgroundColor: "transparent", marginTop: "1.4rem", marginBottom: "1.4rem" }}> {text}</p>
            </div>
        )
    }

    function navBarButton(link, src) {
        return (
            <a href={link}>
                <img src={src} style={{ marginTop: "1.4rem" }} />
            </a>
        )
    }

    function header1(text) {
        return (
            <p style={{ color: "white", fontSize: "80px", backgroundColor: "transparent", fontWeight: "bold", marginBottom: "0" }}> {text}</p>
        );
    }

    const bodyText1Style = {
        fontSize: "35px",
        color: "#8B8B8B"
    }

    const bodyText2Style = {
        fontSize: "45px",
        color: "#8B8B8B"
    }

    function linkText(text) {
        return (
            <div>
                <span style={{ color: "white", fontSize: "55px", backgroundColor: "transparent", marginTop: "1.4rem", marginBottom: "1.4rem" }}>{text}</span>
                <img src={ArrowRight} style={{ margin: "1.2rem 1rem", verticalAlign: "top" }} />
            </div>
        )
    }

    function commonToken() {
        return (
            <span style={{ color: "#BF9AFC" }}>Common Token</span>
        )
    }

    return (
        <div>
            <div className="container-fluid" style={{ backgroundColor: "#202020" }}>
                {/* Nav Bar */}
                <div className="row" style={{ margin: "1rem 2rem" }}>
                    <div className="col-auto" >
                        <img src={CommonLogoLarge} width="200rem" style={{ margin: "1rem" }} />
                    </div>
                    <div className="col">
                        <div className="row justify-content-end">
                            <div className="col-auto">
                                {navBarButton("https://twitter.com/commongg", TwitterLogo)}
                            </div>
                            <div className="col-auto">
                                {navBarButton("https://www.google.com/", DiscordLogo)}
                            </div>
                            <div className="col-auto">
                                {navBarText("Our Token")}
                            </div>
                            <div className="col-auto">
                                {navBarText("Login")}
                            </div>
                            <div className="col-auto" style={{ marginTop: ".3rem" }}>
                                <SignUpButton />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ margin: "1rem 2rem" }}>
                    <div className="col-6">
                        {header1("Earn when you post")}
                        <br />
                        <p style={bodyText1Style}>With Common Token, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <div className="row justify-content-center">
                            {linkText("Sign up now")}
                        </div>
                    </div>
                    <div className="col-6" style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}> {/* put image here */}
                        <div style={{
                            backgroundColor: "#3F3F3F",
                            borderRadius: "50%",
                            width: "600px",
                            height: "600px",
                        }}></div>
                    </div>
                </div>
                <div className="row" style={{ margin: "1rem 2rem" }}>

                </div>
            </div>
            <div className="container-fluid" style={{ backgroundColor: "#2A2A2D" }}>
                <div className="row" style={{ margin: "3rem 2rem" }}>
                    <div className="col-6">
                        {header1("Introducing")}
                        {header1(commonToken())}
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <div style={{
                                backgroundColor: "#3F3F3F",
                                borderRadius: "50%",
                                width: "600px",
                                height: "600px"
                            }}></div>
                        </div>
                    </div>
                    <div className="col-6">
                        <p style={bodyText1Style} align="right">
                            With Common Token, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        </p>
                        <p style={bodyText2Style} align="right">
                            consequatWith Common Token, Lorem inostrud
                        </p>
                        <p style={bodyText1Style} align="right">
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatWith Common Token, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        {linkText("Our whitepaper")}
                    </div>
                </div>
                <div className="row" style={{ margin: "1rem 2rem" }}>

                </div>
            </div>
        </div>
    )
}
export default Whitepaper;