import React from 'react';
import logo from '../images/icons/logo1light.png';

function MobileWarning(props) {
  return (
    <div className="text-center" style={{ marginTop: "20vh" }}>
      <img src={logo} alt="Common logo" />
      <p style={{
        marginTop: "5vh",
        marginLeft: "15%",
        marginRight: "15%"
      }}
      > Common.gg is not yet fully optimized for mobile browsers. For best experience, please use a desktop or desktop mode!</p>
      <p style={{
        cursor: "pointer",
        textDecoration: "underline"
      }} onClick={() => props.setDisplayMobileWarning(false)}> Continue Anyway</p>
    </div>
  );
}

export default MobileWarning;
