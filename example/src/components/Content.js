import React from 'react';
import User from '../components/User';

const Content = ({ fetching, user, error }) => {
  if (fetching) {
    return <h1>Sending request...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  if (user) {
    return <User {...user}/>;
  }

  return <div/>;
};

export default Content;
