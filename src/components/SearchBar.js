import React, { useState, useRef, Fragment } from 'react';
import searchIcon from '../images/icons/search.png'
import { Typeahead, withAsync } from 'react-bootstrap-typeahead';
import SearchBox from './SearchBox';

const AsyncTypeahead = withAsync(Typeahead);

function SearchBar(props) {

  const barStyle = {
    border: "2px solid #BF9AFC",
    borderRadius: "8px",
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  const imgStyle = {
    position: "relative",
    float: "right",
    top: "-px",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    margin: "10px",
  
  }

  return (
    <div>
      <div className="Input" style={barStyle} >
        <SearchBox search={props.search} allGames={props.allGames} setAllGames={props.setAllGames}/>
        <img src={searchIcon} alt="search bar" style={imgStyle} />
      </div>
    </div>
  );
}

export default SearchBar;
