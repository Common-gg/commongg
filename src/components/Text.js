import React from 'react';

function Text(props) {

  function getStyle() {
    const defaultStyle = {
      color: "#ffffff",
      overflowWrap: 'break-word', 
      paddingLeft: "0px", 
      paddingRight: "0px",
    };
    if (props.style === undefined) {
      return (defaultStyle);
    } else {
      let combinedStyle = {
        ...defaultStyle,
        ...props.style
      }
      return combinedStyle;
    }
  }

  return (
    <div className="Text" style={getStyle()}>
        <p>{props.text}</p>
    </div>
  );
}

export default Text;
