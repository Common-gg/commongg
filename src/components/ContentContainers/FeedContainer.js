import React, { useEffect, useState } from 'react';
import FeedType from '../FeedType.js';

function FeedContainer(props) {

  return (
    <div>
      <FeedType {...props} filter={"text"} sort={"type"}/>
    </div>
  );
}

export default FeedContainer;
