import React, { useState } from "react";
import Input from '../components/Input.js';
import logo from "../images/icons/logo1light.png";
import { Link } from "react-router-dom"

function ForgotPassword(props) {
    const [email, setEmail] = useState();
    const [isResetPasswordEmailSent, setIsResetPasswordEmailSent] = useState(null);

    const logoCSS = {
        /* logo1light 1 */
        width: "6.5rem",
        height: "auto",
        left: "393px",
        top: "179px"
    }

    const buttonStyle = {
        backgroundColor: "transparent",
        color: "#BF9AFC",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px"
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
            return (<p style={{ color: "red" }}>there was an error when trying to send reset password email</p>);
        }
        else {
            return (<p style={{ color: "green" }}>password reset email sent successfully!</p>);
        }
    }

    return (
        <div>
            <div className="mx-auto card"
                style={{
                    margin: "150px",
                    maxWidth: "410px",
                    backgroundColor: "#292833",
                    borderRadius: "10px",
                    boxShadow: "-1px 7px 150px 1px #171421"
                }}>
                <div style={{ margin: "20px 20px 0px 20px" }}>
                    <div className="row">
                        <div className="col-4"></div>
                        <img src={logo} style={logoCSS} />
                        <div className="col-5" style={{ pointerEvents: "none" }}></div>
                        <br />
                        <div className="form-group" >
                            <div className="row">
                                <div className="col-6"></div>
                                <div className="row">
                                    <div className="col-6"></div>
                                    <div className="row">
                                        <div className="col-6"></div>
                                        <div className="row">
                                            <div className="col-4"></div>
                                            <br />
                                            <Input type="email"
                                                bootstrap="border border-secondary"
                                                placeholder="email"
                                                style={{ backgroundColor: "#292833", }}
                                                track={setEmail} />
                                        </div></div></div></div></div></div>
                    <div className="form-group">
                        <div className="row col-12">
                            <div className="col-1"></div>
                            <div className="row">
                                <div className="col-1"></div>
                                <div className="row">
                                    <div className="col-1"></div>
                                    <div className="row">
                                        <div className="col-1"></div>
                                        <div className="row">
                                            <div className="col-1"></div>
                                        </div></div></div></div></div></div>
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
                                forgot password
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
                        <p className="col" style={{ color: "#BF9AFC", textDecoration: "underline" }}>
                            Login
                            </p>
                    </Link>
                </div></div>
        </div>
    );

}
export default ForgotPassword;