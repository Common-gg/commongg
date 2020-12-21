import React from 'react';
import { Link } from "react-router-dom";
import noPage from '../../images/icons/404.png'

function PageNotFound(props) {

  return (
    <div className="text-center">
      <br />
      <img src={noPage} alt="404 page not found" style={{width: "321px", height: "171px"}}/>
      <br /><br />
      <Link  to="/" style={{color: "#BF9AFC"}} ><p>Home</p></Link>
    </div>
  );
}

export default PageNotFound;
