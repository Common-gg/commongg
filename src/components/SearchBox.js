import React, { useState, useRef, Fragment } from 'react';
import { Typeahead, withAsync } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const AsyncTypeahead = withAsync(Typeahead);

function SearchBox(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const inputStyle = {
    border: "none",
    width: "100%"
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

  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="searchBox"
      isLoading={isLoading}
      labelKey="login"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="search"
      style={inputStyle}
      renderMenuItemChildren={(option, props) => (
        <Fragment>
          <img
            alt={option.login}
            src={option.avatar_url}
            style={{
              borderRadius: '25px',
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />
          <span style={{color: "white"}}>{option.login}</span>
        </Fragment>
      )}
    />
  );
}

export default SearchBox;
