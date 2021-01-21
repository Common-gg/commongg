import React, { useState, useEffect } from "react";
import Input from '../components/Input.js';
import logo from "../images/icons/logo1light.png";
import { Link } from "react-router-dom"

function ChangePassword(props) {
    const initialInputState = { current: { value: "" } };
    const [password, setPassword] = useState(initialInputState);
    const [confirmPassword, setConfirmPassword] = useState(initialInputState);
    const [oobCode, setOobCode] = useState();
    const [displayValidationForWeakPassword, setDisplayValidationForWeakPassword] = useState(false);
    const [isConfirmPasswordValidationDisplayed, setIsConfirmPasswordValidationDisplayed] = useState(false);
    const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(null);

    useEffect(() => {
        let url = new URL(window.location.href);
        setOobCode(url.searchParams.get("oobCode"));
    }, [])

    const inputStyle = {
        backgroundColor: "transparent #292833",
        color: "#BF9AFC",
        border: "solid",
        borderColor: "#BF9AFC",
        borderWidth: "1px",
        borderRadius: "2px",
        backgroundColor: "#292833",
        padding: "0.3rem",
        margin: "3%",
        width: "80%",
        height: "77%",
        marginLeft: "10%"
    }
    const logoCSS = {
        /* logo1light 1 */
        width: "4.5rem",
        height: "auto",
        marginBottom: "20px",
        marginTop: "0.5rem"
    }
    const buttonStyle = {
        backgroundColor: "transparent",
        color: "#BF9AFC",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px",
        fontSize: "1.1rem"
    }

    function clearValidationBools() {
        setIsPasswordResetSuccess(null);
        setIsConfirmPasswordValidationDisplayed(false);
        setDisplayValidationForWeakPassword(false);
    }

    function handleChangePasswordClick() {
        clearValidationBools();

        const validatePasswordRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{6,}$/
        let passwordStrength = password.current.value.match(validatePasswordRegex);

        if (passwordStrength === null) {
            setDisplayValidationForWeakPassword(true);
            return;
        }
        else if (password.current.value === "" || confirmPassword.current.value === "") {
            return;
        }
        else if (password.current.value !== confirmPassword.current.value) {
            setIsConfirmPasswordValidationDisplayed(true);
            return;
        }
        else {
            props.handleResetPassword(oobCode, password.current.value, setIsPasswordResetSuccess);
            password.current.value = "";
            confirmPassword.current.value = "";
        }
        handleMessagingForChangePassword();
    }

    function handleMessagingForChangePassword() {
        if (isPasswordResetSuccess === true) {
            return (<p style={{ color: "green" }}>password reset successful! return to login page to continue</p>);
        }
        else if (displayValidationForWeakPassword === true) {
            return (<p style={{ color: "#F34D4D" }}>passwords must have at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number</p>);
        }
        else if (isPasswordResetSuccess === false) {
            return (<p style={{ color: "#F34D4D" }}>there was an error when trying to reset your password</p>);
        }
        else if (isConfirmPasswordValidationDisplayed === true) {
            return (<p style={{ color: "#F34D4D" }}>Password field and confirm password field do not match. Ensure they match and try again.</p>);
        }
        else {
            return (
                <div></div>
            );
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
                    boxShadow: "-1px 7px 25px 1px #171421"
                }}>
                <div style={{ margin: "20px 20px 0px 20px" }}>
                    <div className="row mx-auto">
                        <div className="col-12 mx-auto" style={{ textAlign: "center", }}>
                            <img style={logoCSS} src={logo} />
                            <div style={{ pointerEvents: "none" }}></div>
                        </div>
                        <div className="col-5" style={{ pointerEvents: "none" }}></div>
                        <div className="form-group col-12">
                            <div className="row mx-auto">
                                <Input type="password"
                                    bootstrap="border-0"
                                    placeholder="new password"
                                    style={{ backgroundColor: "#292833", }}
                                    track={setPassword}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div className="form-group col-12">
                            <div className="row mx-auto">
                                <Input type="password"
                                    bootstrap="border-0"
                                    placeholder="confirm new password"
                                    style={{ backgroundColor: "#292833" }}
                                    track={setConfirmPassword}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        {handleMessagingForChangePassword()}
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-info" onClick={handleChangePasswordClick}
                            style={buttonStyle} >
                            change password
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-5"></div>
                        <br />
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Link to="/">
                    <p className="col" style={{ marginTop: "-8rem", fontSize: "1.1rem", color: "#BF9AFC", textDecoration: "underline" }}>
                        Login
                        </p>
                </Link>
            </div>
        </div>
    );
}
export default ChangePassword;