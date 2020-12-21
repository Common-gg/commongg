import React, { useRef } from 'react';
import searchIcon from '../images/icons/search.png'

function SearchBar(props) {

  const value = useRef();

  const barStyle = {
    border: "2px solid #BF9AFC",
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  const inputStyle = {
    backgroundColor: "transparent",
    border: "none",
    width: "90%"
  }

  const imgStyle = {
    position: "relative",
    verticalAlign: "middle",
    width: "30px",
    height: "30px",
    cursor: "pointer"
  }

  function handleOnKeyDown(e) {
    if ((e.key === "Enter") && (props.type === "password")) {
      props.signInUser(props.email, props.password.current.value);
    }
  }

  return (
    <div className="Input" style={barStyle} >
      <input 
        className={props.bootstrap} 
        type="search" 
        placeholder="search" 
        id="searchBar" 
        ref={value}
        style={inputStyle}
        onChange={() => (props.track(value))}
        onKeyDown={(e) => handleOnKeyDown(e)}
      />
      <img src={searchIcon} alt="search bar" style={imgStyle} />
    </div>
  );
}

export default SearchBar;
