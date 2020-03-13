import React from 'react';
import {Link} from 'react-router-dom';

const style = {
  padding: '10px',
  textAlign: 'center' as const,
  color: 'coral',
  width: '30vw',
  transform: 'translate(-50%, -50%)',
  position: 'absolute' as const,
  left: '50%',
  top: '30%'
};

const NotFound: React.FC = () => {
  return (
    <div style={style}>
      <div>Invalid address. Try this link instead:</div>
      <Link to={'/'}>Home page - Characters list</Link>
    </div>
  );
};

export default NotFound;
