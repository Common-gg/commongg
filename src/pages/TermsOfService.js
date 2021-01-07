import React, { useState } from "react";
import CommonLogoLarge from "../images/icons/logotextlarge 1.png";

function TermsOfService(props) {

    const styleCommonLogo = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    function headerStyle(text) {
        return (
            <div className="row">
                <div className="col-sm-3 "></div>
                <p className="col" style={{ color: "white", fontSize: "20px" }}> {text}</p>
            </div>
        );
    }

    function bodyText(text) {
        return (
            <div className="row">
                <div className="col-sm-3 "></div>
                <p className="col-6" style={{ color: "#BF9AFC", fontSize: "20px" }}>{text}</p>
            </div>
        );
    }

    return (
        <div className="Terms Of Service">
            <div style={styleCommonLogo}>
                <img src={CommonLogoLarge} />
            </div>
            <br /><br /><br /><br />
            <div className="row">
                <div className="col-sm-3 "></div>
                <p className="col" style={{ color: "white", fontSize: "40px" }}> Privacy Policy</p>
            </div>
            {bodyText("At Common.gg, we collect and manage user data according to the following Privacy Policy.")}
            <br />
            {headerStyle("Data Collected")}
            {bodyText("We collect information you provide directly to us. For example, we collect information when you create an account, subscribe, " +
                "participate in any interactive features of our services, fill out a form, request customer support or otherwise communicate with us. " +
                "The types of information we may collect include your name, email address, and other contact or identifying information you choose to provide.")}
            <br />
            {bodyText("We collect anonymous data from every visitor of the Website to monitor traffic and fix bugs. For example, we collect information like " +
                "web requests, the data sent in response to such requests, the Internet Protocol address, the browser type, the browser language, and a timestamp " +
                "for the request.")}
            <br />
            {bodyText("We also use various technologies to collect information, and this may include sending cookies to your computer. Cookies are small data files " +
                "stored on your hard drive or in your device memory that helps us to improve our services and your experience, see which areas and features of our " +
                "services are popular and count visits.")}
            <br />
            {headerStyle("Use of the Data")}
            {bodyText("We only use your personal information to provide you the common.gg services or to communicate with you about the site or the services.")}
            <br />
            {headerStyle("Sharing of Data")}
            {bodyText("We don't share your personal information with third parties. Aggregated, anonymized data is periodically transmitted to external " +
                "services to help us improve the Website and service.")}
            {bodyText("We may allow third parties to provide analytic services. These third parties may use cookies, web beacons and other technologies to " +
                "collect information about your use of the services and other websites, including your IP address, web browser, pages viewed, time spent on pages, " +
                "links clicked and conversion information.")}
            <br />
            {headerStyle("Opt-Out, Communication Preferences")}
            {bodyText("You may modify your communication preferences and/or opt-out from specific communications at any time. Please specify and adjust your preferences.")}
            <br />
            {headerStyle("Security")}
            {bodyText("We take reasonable steps to protect personally identifiable information from loss, misuse, and unauthorized access, disclosure, alteration, " +
                "or destruction.But, you should keep in mind that no Internet transmission is ever completely secure or error - free.In particular, email sent to or " +
                "from the Sites may not be secure.")}
            <br />
            {headerStyle("About Children")}
            {bodyText("The Website is not intended or allowed for children under the age of 13. We do not knowingly collect personally identifiable information via " +
                "the Website from visitors in this age group.")}
            <br />
            {headerStyle("Changes to the Privacy Policy")}
            {bodyText("Our privacy policy may change over time. If we make major changes in the way we collect or use information, we will notify you by posting " +
                "an announcement on the Website or sending you an email.")}
            <br />

        </div>
    );
}
export default TermsOfService;