import React from 'react';

function Text(props) {

  function getStyle () {
    if(props.style === undefined){
      return({color: "#ffffff"});
    }else{
      return props.style;
    }
  }

  return (
    <div className="Text" style={getStyle()}>
        <p>{props.text}</p>
    </div>
  );
}

export default Text;
