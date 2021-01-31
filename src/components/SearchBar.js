import React from 'react';
import searchIcon from '../images/icons/search.png'
import SearchBox from './SearchBox';
import * as Icon from 'react-bootstrap-icons';

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
    width: "25px",
    height: "25px",
    cursor: "pointer",
    margin: "10px",
    color: "#BF9AFC"

  }

  return (
    <div>
      <div className="Input" style={barStyle} >
        <SearchBox
          search={props.search}
          allGames={props.allGames}
          setAllGames={props.setAllGames} />
          <Icon.Search alt="search bar"
          style={imgStyle}/>
      </div>
    </div>
  );
}

export default SearchBar;
