import React, { useEffect, useState } from 'react';
import logo from "../images/icons/logo1light.png";

function VerifyEmail(props) {

    const [emailIsVerified, setEmailIsVerified] = useState(null);
    const [oobCode, setOobCode] = useState("");

    useEffect(() => {
        let url = new URL(window.location.href);
        setOobCode(url.searchParams.get("oobCode"));
    }, []);

    useEffect(() => {
        if (oobCode !== "") {
            props.handleVerifyEmail(oobCode, setEmailIsVerified);
            handleMessagingForVerifyingEmail();
        }
    }, [oobCode]);

    const logoCSS = {
        width: "100px",
        height: "99.01px",
        left: "393px",
        top: "179px"
    }

    function handleMessagingForVerifyingEmail() {
        if (emailIsVerified === true) {
            return (<p style={{ color: "green" }}>Email Verified!</p>);
        }
        else if (emailIsVerified === null) {
            return (<div></div>);
        }
        else {
            return (<p style={{ color: "#F34D4D" }}>There was a problem trying to verify your email.</p>);
        }
    }

    return (
        <div>
            <div className="mx-auto card text-center loginCard">
                <div style={{ margin: "20px 20px 0px 20px" }}>
                    <div className="d-flex justify-content-center">
                        {handleMessagingForVerifyingEmail()}
                    </div>
                    <div className="mx-auto">
                        <img style={logoCSS} className="mx-auto" src={logo} />
                        <div style={{ pointerEvents: "none" }}></div>
                        <br /><br />
                        <div className="form-group" >
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
}
export default VerifyEmail;