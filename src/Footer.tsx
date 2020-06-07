import React from 'react';
import css from './components/style/App.module.scss';

const items = [
  {
    title: 'male',
    className: css.colorBoxMale
  },
  {
    title: 'female',
    className: css.colorBoxFemale
  },
  {
    title: 'house',
    className: css.colorBoxHouse
  }
];

const Footer: React.FC = () => {
  return (
    <div className={css.hints}>
      {items.map((item, index) => {
        return (
          <div className={css.hint} key={`${index}-${item.title}`}>
            <div id={`colorBox-${index}`} className={item.className} />
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default Footer;