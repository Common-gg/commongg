import React, { useEffect, useState } from 'react';
import logo from "../images/icons/logo1light.png";

function ReminderVerifyEmail(props) {

    const logoCSS = {
        width: "4.5rem",
        height: "auto",
        marginBottom: "20px",
        marginTop: "20px"
    }
    const buttonStyle = {
        backgroundColor: "transparent",
        color: "#BF9AFC",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px",
        position: "relative",
        left: "1rem",
        textAlign: "center"
    }

    function handleResendVerifyEmailClick() {
        props.sendVerifyEmail();
    }

    return (
        <div>
            <div className="mx-auto card text-center"
                style={{
                    margin: "200px",
                    maxWidth: "20%",
                    backgroundColor: "#292833",
                    borderRadius: "10px",
                    boxShadow: "-1px 7px 25px 1px #171421",
                    color: "#BF9AFC",
                }}>
                <div style={{ margin: "20px 20px 0px 20px" }}>
                    <div className="mx-auto">
                        <img style={logoCSS} className="mx-auto" src={logo} />
                        <br /><br />
                        <p>please verify your email</p>
                        <div style={{ pointerEvents: "none" }}></div>
                        <button className="btn btn-info" onClick={handleResendVerifyEmailClick} style={buttonStyle} >
                            re-send verification email
                        </button>
                        <div className="form-group" >
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
}
export default ReminderVerifyEmail;