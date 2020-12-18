import React, { useEffect, useState } from 'react';
import GamesContainer from "../components/ContentContainers/GamesContainer"

function Categories(props) {
  return (
    <div className="Categories">
      <GamesContainer {...props} />
    </div>
  );
}

export default Categories;
