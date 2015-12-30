import React from 'react';

const User = ({ id, name, email }) => (
  <div>
    <h1>{id}: {name}</h1>
    {email &&
      <h2>{email}</h2>
    }
  </div>
);

export default User;
