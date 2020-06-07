import React, { useCallback } from 'react';
import {useHistory} from 'react-router-dom';
import css from '../components/style/NotFound.module.scss'
import { Button } from './NavButton';
import { goHome } from '../util/ClickHandler';

const NotFound: React.FC = () => {
  const history = useHistory();

  const doClick = useCallback(() => {
    goHome(history);
  }, [history]);

  return (
    <div className={css.errorPage}>
      <img src={process.env.PUBLIC_URL + '/logo.png'} alt='The Logo' />
      <div>Unexpected happens</div>
      <div>Cannot get data to display. Consider pressing this:</div>
      <Button title='Home Page' onClick={doClick} />
    </div>
  );
};

export default NotFound;
