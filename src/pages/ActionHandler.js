import React, { useEffect, useState } from "react";
import VerifyEmail from "./VerifyEmail.js";
import ChangePassword from "./ChangePassword.js";
import PageNotFound from '../components/ContentContainers/PageNotFound.js';

function ActionHandler(props) {
    const [mode, setMode] = useState("");

    useEffect(() => {
        let url = new URL(window.location.href);

        setMode(url.searchParams.get("mode"));
    }, []);

    switch (mode) {
        case "verifyEmail":
            return <VerifyEmail handleVerifyEmail={props.handleVerifyEmail} />;
        case "resetPassword":
            return <ChangePassword handleResetPassword={props.handleResetPassword} />;
        default:
            return <PageNotFound />;
    }
}
export default ActionHandler;