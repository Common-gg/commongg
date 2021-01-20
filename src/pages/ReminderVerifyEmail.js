import React, { useEffect, useState } from 'react';
import logo from "../images/icons/logo1light.png";
import { Link } from "react-router-dom";

function ReminderVerifyEmail(props) {
    const [isVerifyEmailSentSuccessful, setIsVerifyEmailSentSuccessful] = useState();

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
                <div style={{ margin: "20px 20px 0px 20px" }} >
                    <div className="d-flex justify-content-center text-center">
                        {handleVerificationEmailFeedbackMessage()}
                    </div>
                    <div className="mx-auto">
                        <img style={logoCSS} className="mx-auto" src={logo} />
                        <br /><br />
                        <p>Please check your email for a verification email</p>
                        <div style={{ pointerEvents: "none" }}></div>
                        <button className="btn btn-info mx-auto" onClick={handleResendVerifyEmailClick} style={buttonStyle} >
                            Re-send Email
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