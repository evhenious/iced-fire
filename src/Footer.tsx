import React from 'react';
import css from './components/style/App.module.scss';

const items = [
  {
    title: 'darkturquoise card - male',
    className: css.colorBoxMale
  },
  {
    title: 'cornsilk card - female',
    className: css.colorBoxFemale
  },
  {
    title: 'coral card - house',
    className: css.colorBoxHouse
  }
];

const Footer: React.FC = () => {
  return (
    <div className={css.hints}>
      {items.map((item) => {
        return (
          <div className={css.hint}>
            <div id='colorBox' className={item.className} />
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default Footer;