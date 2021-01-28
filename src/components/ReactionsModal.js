import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactionImage from './ReactionImage'

function ReactionsModal(props) {

  //initialize the reactions to display
  const [curReaction, setCurReaction] = useState(null);
  const [usersList, setUsersList] = useState([]);

  const handleClose = () => {
    props.setShowModal(false);
  }

  
  const modalHeaderStyle = {
    borderBottom: "0 none",
    textAlign: "center",
    marginBottom: "-30px", 
    marginTop: "-10px",
    backgroundColor: "#2A2A2D",
    color: "#BF9AFC",
  }

  const modalContentStyle = {
    color: "#BF9AFC",
    backgroundColor: "#2A2A2D",
    borderBottom: "",
    margin: "5%"
  }

  const groupStyle = {
    minHeight: "60vh",
    listStyleType: "none",
    backgroundColor: "#2A2A2D",
    padding: "0",

  };

  useEffect(() => {
    setCurReaction(null);
  }, [props.content])

  useEffect(() => {
    //only do it if curReaction isnot null
    const promises = [];
    if (curReaction && props.content.get(curReaction)) {
      Object.values(props.content.get(curReaction)).forEach((user) => {
        //retrieve the users one by onbe
        promises.push(props.getUserWithUsername(user));
      });
      Promise.all(promises).then((result) => {
        //if username changes it can return null
        const processed = result.map(user => {
          //firebase returns the object of unique id as value destructure it
          if (user) {
            const id = Object.keys(user)[0];
            const ret = [...Object.values(user)][0];
            ret.id = id;
            return ret;
          }
          return null;
        })
        setUsersList(processed);
      })
    }
  }, [curReaction, props.content, props.getUserWithUsername])

  //check the current reactions and return jsx for them
  const checkReactions = () => {
    if (props.content) {
      const reactions = [];
      var count = 0;
      //loop through all the entries inside the map
      for (const [key, value] of props.content.entries()) {
        //set default to first one cause that's only time it can have none
        if (!curReaction && count === 0) {
          setCurReaction(key);
        }
        count += 1;
        reactions.push(
          <li onClick={() => setCurReaction(key)} style={{ cursor: "pointer", background: key === curReaction ? "#373241" : null, padding: "5%" }}>
            <span style={{ padding: "5px" }}><ReactionImage reaction={key}></ReactionImage></span>
            <span>{value.length}</span>
          </li>);
      }
      return (
        <>
          <ul className="col" style={groupStyle}>
            {reactions}
          </ul>
          <div className="col-8">
            {usersList.map((user) => user ? <Link to={"/profile/" + user.username} onClick={handleClose}><div className="row" style={{ width: "100%", padding: "6px" }}>
              <img
                alt={user.username}
                src={user.profile_picture}
                style={{
                  borderRadius: '50%',
                  height: '1.8rem',
                  marginRight: '.8rem',
                  width: '1.8rem',
                }}
              />
              <span style={{ color: "white", 
              position: "relative", 
              bottom: "-.2rem" }}
              >{user.username}</span>
            </div></Link> : null)}
          </div>
        </>
      );
    } else {
      return (
        <>
          <ul className="col" style={groupStyle}>
          </ul>
          <div className="col-8">
          </div>
        </>
      );
    }
  }

  return (
    <div className="CreateReactionModal" >
      <Modal show={props.showModal} onHide={handleClose}>
        <div style={modalContentStyle}>
          <Modal.Header closeButton style={modalHeaderStyle}>
            <p style={{fontSize: "1.75rem"}}>Reactions</p>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                {checkReactions()}
              </div>
            </div>
          </Modal.Body>
        </div>

      </Modal>
    </div>
  )
}

export default ReactionsModal;