import React from 'react';
import {Link} from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div>
      <div>Invalid address. Probably you need this link:</div>
      <Link to={'/'}>Home page - Characters list</Link>
    </div>
  );
};

export default NotFound;
