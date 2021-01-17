import React, { useState, useRef, Fragment } from 'react';
import { Typeahead, withAsync } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Link, Redirect } from "react-router-dom";

const AsyncTypeahead = withAsync(Typeahead);

function SearchBox(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const inputStyle = {
    border: "none",
    width: "100%"
  }


  //the users from search results get passed in
  const afterSearch = (users, query) => {

    let options = []
    //try find games first
    const gameResult = searchGames(query);
    if (gameResult.length > 0) {
      options.push({ name: "games", type: "label" });
      //might introduce issue when a person's name is same as game's name
      options = options.concat(gameResult.map((game, i) => ({
        image: game.image,
        name: game.title,
        type: "game"
      })));
    }

    if (Object.values(users).length > 0) {
      options.push({ name: "users", type: "label" });
      options = options.concat(Object.values(users).map((user, i) => ({
        avatar_url: user.profile_picture,
        id: Object.keys(users)[i],
        name: user.username,
        type: "user"
      })));
    }

    //if no result is found let users know
    if (options.length === 0) {
      options.push({ name: "No Result Found", type: "label" });
    }


    setOptions(options);
    setIsLoading(false);
  }

  //search games based on query
  const searchGames = (query) => {
    let result = props.allGames.filter((game) => {
      //check if query is in the title
      return game.title.toLowerCase().includes(query.toLowerCase());
    });
    return result;
  }

  const handleSearch = (query) => {
    setIsLoading(true);
    props.search(query, afterSearch, query);
  };

  const filterBy = () => true;
  
  const [enteredValue, setEntered] = useState(null);
  const Arrowhead = (input) => {
    if(input && input[0] && input[0]["name"] && input[0]["type"] === "game"){
      let url = "/games/".concat(input[0]["name"]).split(" ").join('').toLowerCase();
      setEntered(url);
    }
    if(input && input[0] && input[0]["name"] && input[0]["type"] === "user"){
      let url = "/profile/".concat(input[0]["name"]);
      setEntered(url);
    }
  }

  return (
    <React.Fragment>
      {enteredValue && <Redirect to={enteredValue} />}
      <AsyncTypeahead
        filterBy={filterBy}
        id="searchBox"
        isLoading={isLoading}
        labelKey="name"
        minLength={3}
        onSearch={handleSearch}
        options={options}
        placeholder="search users and games"
        style={inputStyle}
        onChange={Arrowhead}
        renderMenuItemChildren={(option, props) => (
          <Fragment>
            {option.type === "user" && <Link to={"/profile/" + option.name}>
              <div className="row" style={{ width: "100%" }}>
                <img
                  alt={option.name}
                  src={option.avatar_url}
                  style={{
                    borderRadius: '50%',
                    height: '1.8rem',
                    marginRight: '.8rem',
                    width: '1.8rem',
                  }}
                />
                <span style={{ color: "white", position: "relative", bottom: "-.2rem" }}>{option.name}</span>
              </div>
            </Link>}
            {option.type === "game" && <Link to={"/games/" + option.name.split(" ").join('').toLowerCase()}>
              <div className="row" style={{ width: "100%" }}>
                <img
                  alt={option.title}
                  src={option.image}
                  style={{
                    borderRadius: '50%',
                    height: '1.8rem',
                    marginRight: '.8rem',
                    width: '1.8rem',
                  }}
                />
                <span style={{ color: "white", position: "relative", bottom: "-.2rem" }}>{option.name}</span>
              </div>
            </Link>}
            {option.type === "label" &&
              <span style={{ color: "white" }}>{option.name}</span>
            }
          </Fragment>
        )}
      /></React.Fragment>
  );
}

export default SearchBox;
