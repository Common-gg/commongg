import React, { useState, useEffect } from 'react';
import UserCard from '../UserCard.js'

function ModUsersContainer(props) {
  const [reportedUsers, setReportedUsers] = useState({});

  useEffect(() => {
    props.getReportedUsers(setReportedUsers);
  }, []);


  return (
    <div>
      {Object.values(reportedUsers).map((user, i) => {
        return <UserCard {...props} user={user} userId={Object.keys(reportedUsers)[i]} />
      })}
    </div>
  );
}

export default ModUsersContainer;
