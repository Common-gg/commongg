import React, { useState, useRef, Fragment } from 'react';
import searchIcon from '../images/icons/search.png'
import { Typeahead, withAsync } from 'react-bootstrap-typeahead';
import SearchBox from './SearchBox';

const AsyncTypeahead = withAsync(Typeahead);

function SearchBar(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const value = useRef();

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
    cursor: "pointer"
  }

  const afterSearch = (users) => {
    setOptions(Object.values(users).map((user, i) => ({
      avatar_url: user.profile_picture,
      id: Object.keys(users)[i],
      login: user.username
    })));
    setIsLoading(false);
  }

  const handleSearch = (query) => {
    setIsLoading(true);
    props.search(query, afterSearch);
  };

  function handleOnKeyDown(e) {
    if (e.key === "Enter") {
      props.search(value.current.value);
    }
  }

  const filterBy = () => true;

  return (
    <div>
      <div className="Input" style={barStyle} >
        <SearchBox search={props.search} />
        <img src={searchIcon} alt="search bar" style={imgStyle} />
      </div>
    </div>
  );
}

export default SearchBar;
