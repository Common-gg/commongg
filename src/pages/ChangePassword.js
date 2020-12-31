import React, { useState, useEffect } from "react";
import Input from '../components/Input.js';
import logo from "../images/icons/logo1light.png";
import { Link } from "react-router-dom"

function ChangePassword(props) {

    const [password, setPassword] = useState();
    const [oobCode, setOobCode] = useState();
    const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(null);

    useEffect(() => {
        let url = new URL(window.location.href);
        setOobCode(url.searchParams.get("oobCode"));
    }, [])

    const logoCSS = {
        /* logo1light 1 */
        width: "100px",
        height: "99.01px",
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

    function handleChangePasswordClick() {
        props.handleResetPassword(oobCode, password.current.value, setIsPasswordResetSuccess);
        password.current.value = "";
        handleMessagingForChangePassword();
    }

    function handleMessagingForChangePassword() {
        if (isPasswordResetSuccess === null) {
            return (<div></div>);
        }
        else if (isPasswordResetSuccess === false) {
            return (<p style={{ color: "red" }}>there was an error when trying to reset your password</p>);
        }
        else {
            return (<p style={{ color: "green" }}>password reset successful! return to login page to continue</p>);
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
                    boxShadow: "-1px 10px 250px 1px #171421"
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
                                            <Input type="password"
                                                bootstrap="border border-secondary"
                                                placeholder="password"
                                                style={{ backgroundColor: "#292833", }}
                                                track={setPassword} />
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
                        {handleMessagingForChangePassword()}
                    </div>
                    <div className="row col-12" style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div className="form-group">
                            <button className="btn btn-info" onClick={handleChangePasswordClick}
                                style={buttonStyle} >
                                change password
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
export default ChangePassword;