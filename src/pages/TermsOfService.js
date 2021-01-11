import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CommonLogoLarge from "../images/icons/logotextlarge 1.png";
import ArrowLeft from "../images/icons/arrowleft 1.png"


function TermsOfService(props) {
    const history = useHistory();
    const imageBackButtonStyle = {
        width: "40px",
        height: "45px",
        paddingRight: ".5rem"
    };

    const backButtonStyle = {
        backgroundColor: "transparent",
        color: "#BF9AFC",
        borderWidth: "2px",
        padding: "0.6rem",
        paddingTop: "4rem",
        paddingLeft: "8rem"
    };
    const styleCommonLogo = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    function largeHeaderStyle(text) {
        return (
            <div className="row">
                <div className="col-sm-1"></div>
                <p className="col" style={{ color: "white", fontSize: "40px" }}> {text}</p>
            </div>
        );
    }

    function headerStyle(text) {
        return (
            <div className="row">
                <div className="col-sm-1"></div>
                <p className="col" style={{ color: "white", fontSize: "20px" }}> {text}</p>
            </div>
        );
    }

    function bodyText(text) {
        return (
            <div className="row">
                <div className="col-sm-1"></div>
                <p className="col-8" style={{ color: "#BF9AFC", fontSize: "20px" }}>{text}</p>
            </div>
        );
    }

    return (
        <div className="Terms Of Service">
            <div>
                <div className="row">
                    <button type="button"
                        className="btn"
                        style={backButtonStyle}
                        onClick={history.goBack}
                    >
                        <div>
                            <p style={{ fontSize: "25px" }}><img src={ArrowLeft} style={imageBackButtonStyle}></img>back</p>

                        </div>
                    </button>
                </div>
                <div style={styleCommonLogo}>
                    <img src={CommonLogoLarge} />
                </div>
            </div>
            <br /><br /><br /><br />
            {largeHeaderStyle("Privacy Policy")}
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
            <hr style={{ backgroundColor: '#BF9AFC', width: '90%', left: "5px" }} />
            <br />
            {largeHeaderStyle("Cookie Policy")}
            {bodyText("Common.gg uses cookies and by using the service, you agree/consent to the use of cookies.")}
            {bodyText("Our cookie policy explains what cookies are, how we use cookies, and how third-parties may use cookies on our site. ")}
            <br />
            {headerStyle("What are cookies")}
            {bodyText("Cookies are small pieces of text sent by your web browser to a site you visit. A cookie file is stored in your browser and allows " +
                "the service of third - party to recognize you and make your next visit easier and service more useful to you(ads catered based upon past " +
                "searches, videos, etc.)")}
            <br />
            {headerStyle("How Common.gg uses cookies")}
            {bodyText("When you use and access our service, we may place some cookie files into your web browser. We use cookies for the following reasons: to " +
                "allow some functions of the service, to provide analytics, to store your tailored to you preferences, to enable advertisements, and tailored to you " +
                "advertisements.")}
            {bodyText("We use various cookies to help run the site: session, persistent, and essential cookies. Essential cookies are used to authenticate users and prevent " +
                "fraudulent use of other accounts.")}
            <br />
            {headerStyle("Third-party cookies")}
            {bodyText("In addition to our own cookies, we may also use different third-party cookies to report statistics of the site, bring advertisements to you and on the site itself, and so on.")}
            <br />
            <hr style={{ backgroundColor: '#BF9AFC', width: '90%', left: "5px" }} />
            <br />
            {largeHeaderStyle("Community Guidelines/Terms of Service")}
            {headerStyle("What's covered in terms of service?")}
            {bodyText("While we understand you may want to skip these Terms of Service, we at commongg want you to understand what you can expect from us as you use the site, " +
                "in addition to what we expect from you. ")}
            <div className="row">
                <div className="col-sm-1"></div>
                <p className="col-8" style={{ color: "#BF9AFC", fontSize: "20px", textDecoration: "underline" }}>By agreeing to and using the services you acknowledge that you will follow these terms during the duration of your stay. </p>
            </div>
            <br />
            {headerStyle("1. Common.gg Services Provided")}
            <div style={{ marginLeft: "2rem" }}>
                {bodyText("You may begin using our services once agreeing to the \"terms.\" You must be at least 13 years old to use the services.")}
            </div>
            {headerStyle("2. Privacy Policy")}
            <div style={{ marginLeft: "2rem" }}>
                {bodyText("In our privacy policy you will learn and agree to what we do with the information you give us when using our services. " +
                    "You also acknowledge that by using common.gg you agree to the collection and use of this information.")}
            </div>
            <div className="row">
                <div className="col-sm-1"></div>
                <p className="col-8" style={{ color: "white", fontSize: "20px", textDecoration: "underline" }}>
                    BY SIGNING UP YOU AGREE TO THE TERMS & CONDITIONS, PRIVACY POLICY, AND COOKIE POLICY
                </p>
            </div>
        </div>
    );
}
export default TermsOfService;