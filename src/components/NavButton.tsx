import React from 'react';
import css from "./style/Button.module.scss";

interface Props {
  title: string;
  onClick(): any;
}

export const Button: React.FC<Props> = (props) => {
  return (
    <div className={css.parent}>
      <input className={css.btn} type='button' value={props.title} onClick={props.onClick} />
    </div>
  );
};
