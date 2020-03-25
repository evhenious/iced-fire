import React from 'react';
import css from './style/Loader.module.scss';

const Loader: React.FC = () => {
  return <div className={css.centered}>
    <div className={css.loader} />
  </div>
}

export default Loader;