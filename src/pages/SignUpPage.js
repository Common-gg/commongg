import React from 'react';
import SignUp from './SignUp';
import logo from "../images/icons/logo1light.png";
import FeedImage from "../images/signup-static-feed.png";

function SignUpPage(props) {

    const logoCSS = {
        /* logo1light 1 */
        width: "4.5rem",
        height: "auto",
        marginBottom: "20px"
    }

    return (
        <div className="container-fluid">
            <div className="signUpBackground">
                <div className="row">
                    <div className="col-xl-1 col-md-0">

                    </div>
                    <div className="col-6 d-none d-md-block" style={{ marginTop: "50px" }}>
                        <div className="row">
                            <div className="col-2" style={{ marginRight: "50px" }}>

                            </div>
                            <div className="col-2" style={{ marginRight: "-30px" }}>
                                <img style={logoCSS} src={logo} />
                            </div>
                            <div className="col-auto" style={{ marginLeft: "0px" }}>
                                <p style={{
                                    fontSize: "25px",
                                    position: "relative",
                                    color: "#BF9AFC",
                                    marginBottom: "0px"
                                }}> The best social network for</p>
                                <span style={{
                                    fontSize: "25px",
                                    position: "relative",
                                    color: "#FFFFFF",
                                }}>Teamfight Tactics</span>
                                <span style={{
                                    fontSize: "25px",
                                    position: "relative",
                                    color: "#BF9AFC",
                                    marginBottom: "0px"
                                }}> gamers</span>
                            </div>
                        </div>
                        <div className="row">
                            <img src={FeedImage} alt="Common.gg Feed" className="mx-auto" style={{ width: '65%', boxShadow: "-1px 7px 25px 1px #060508" }}></img>
                        </div>
                    </div>
                    <div className="col">
                        <div className="SignUp">
                            <SignUp {...props} card={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;
