import React, { useState } from "react";
import Input from '../components/Input.js';
import logo from "../images/icons/logo1light.png";
import { Link } from "react-router-dom"
import arrow from "../images/icons/arrow-right.png";

function ForgotPassword(props) {
    const [email, setEmail] = useState();
    const [isResetPasswordEmailSent, setIsResetPasswordEmailSent] = useState(null);

    const logoCSS = {
        /* logo1light 1 */
        width: "4.5rem",
        height: "auto",
        left: "393px",
        top: "179px",

    }

    const buttonStyle = {
        backgroundColor: "transparent",
        color: "#BF9AFC",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px",
        position: "relative",
        left: "1rem"
    }

    const inputStyle = {
        backgroundColor: "transparent #292833",
        color: "#BF9AFC",
        border: "solid",
        borderColor: "#BF9AFC",
        backgroundColor: "#292833",
        borderRadius: "2px",
        borderWidth: "0.1rem",
        padding: "0.3rem",
        width: "50%",
        height: "65%",
        position: "relative",
        overflow: "hidden",
       marginLeft: "25%"
    }

    function handleForgotPasswordClick() {
        props.resetPasswordEmail(email.current.value, setIsResetPasswordEmailSent);
        email.current.value = "";
        handleMessagingForForgotPassword();
    }

    function handleMessagingForForgotPassword() {
        if (isResetPasswordEmailSent === null) {
            return (<div></div>);
        }
        else if (isResetPasswordEmailSent === false) {
            return (<p style={{ color: "#F34D4D" }}>There was an error when trying to send reset password email</p>);
        }
        else {
            return (<p style={{ color: "green" }}>Password reset email sent successfully!</p>);
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
                <div style={{ margin: "20px 20px 0px 20px" }}>
                    <div className="mx-auto">
                        <img style={logoCSS} className="mx-auto" src={logo} />
                        <div style={{ pointerEvents: "none" }}></div>
                        <br /><br />
                        <p style={{ position: "relative", }}> Forgot Password </p>
                        <div className="form-group" >
                            <div className="row mx-auto">
                                <Input type="email"
                                    className="mx-auto"
                                    bootstrap="border-0"
                                    placeholder="email"
                                    style={inputStyle}
                                    track={setEmail} />
                            </div></div></div>
                    <br />
                    <div className="d-flex justify-content-center">
                        {handleMessagingForForgotPassword()}
                    </div>
                    <div className="row col-12" style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div className="form-group">
                            <button className="btn btn-info" onClick={handleForgotPasswordClick}
                                style={buttonStyle} >
                                <img src={arrow} />
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5"></div>
                        <br />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4"></div>
                <div className="text-center col-4">
                    <Link to="/">
                        <p className="col" style={{
                            position: "relative",
                            padding: '.3rem',
                            lineHeight: "0.5rem",
                            top: "-10.75rem",
                            color: "#BF9AFC",
                            textDecoration: "underline",
                        }}>
                            Login
                         </p>
                    </Link>
                </div></div>
        </div>
    );

}
export default ForgotPassword;