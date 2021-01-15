import React, { useEffect, useState } from 'react';
import logo from "../images/icons/logo1light.png";
import { Link } from "react-router-dom";

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
    const linkStyle = {
        color: "#BF9AFC",
        textDecoration: "underline"
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
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "-10rem" }}>
                < Link to="/" style={linkStyle} >
                    <br /><a onClick={() => props.signOut()}>sign out</a> <br />
                </Link>
            </div>
        </div>
    );
}
export default ReminderVerifyEmail;