import React from 'react';
import {useHistory} from 'react-router-dom';
import css from '../components/style/NotFound.module.scss'
import { Button } from './NavButton';

const NotFound: React.FC = () => {
  const history = useHistory();

  const doClick = () => {
    history.push('/')
  }

  return (
    <div className={css.errorPage}>
      <img src={process.env.PUBLIC_URL + '/logo.png'} />
      <div>Unexpected happens. Consider pressing this:</div>
      <Button title='Home Page' onClick={doClick} />
    </div>
  );
};

export default NotFound;
