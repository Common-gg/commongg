import React, { useState } from 'react';
import logo from "../images/icons/logo1light.png";
import { Link } from "react-router-dom";

function ReminderVerifyEmail(props) {
    const [isVerifyEmailSentSuccessful, setIsVerifyEmailSentSuccessful] = useState();

    const logoCSS = {
        width: "4.5rem",
        height: "auto",
    }
    const buttonStyle = {
        backgroundColor: "transparent",
        color: "#BF9AFC",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px",
        position: "relative",
        textAlign: "center"
    }
    const linkStyle = {
        color: "#BF9AFC",
        textDecoration: "underline"
    }

    async function handleResendVerifyEmailClick() {
        await props.sendVerifyEmail(setIsVerifyEmailSentSuccessful);
        handleVerificationEmailFeedbackMessage();
    }

    function handleVerificationEmailFeedbackMessage() {
        if (isVerifyEmailSentSuccessful === true) {
            return (
                <p style={{ color: "green" }}>Verification email successfully re-sent!</p>
            );
        }
        else if (isVerifyEmailSentSuccessful === false) {
            return (
                <p style={{ color: "#F34D4D" }}>Something went wrong when re-sending verification email.</p>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    function signOutClick() {
        props.signOut();
        props.hideSignUp();
        props.setVerifyEmail(0);
    }

    return (
        <div>
            <div style={{ margin: "20px 20px 0px 20px" }} >
                <div className="col">
                    {handleVerificationEmailFeedbackMessage()}
                </div>
                <div className="col text-center">
                    <div className="row justify-content-md-center col" style={{ margin: "0" }}>
                        <img style={logoCSS} src={logo} />
                    </div>
                    <br />
                    <div className="row justify-content-md-center col" style={{ margin: "0", padding: "0"}}>
                        <p style={{ fontSize: "18px", margin: "0" }}>Please check your email for a verification email</p>
                    </div>
                    <br />
                    <div className="row justify-content-md-center col" style={{ margin: "0", padding: "0" }}>
                        <button className="btn btn-info mx-auto" onClick={handleResendVerifyEmailClick} style={buttonStyle} >
                            Re-send Email
                        </button>
                    </div>
                    < Link to="/" style={linkStyle} >
                        <br /><a onClick={signOutClick} style={{ fontSize: "18px", color: "#FFFFFF" }}>Sign Out</a> <br />
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default ReminderVerifyEmail;