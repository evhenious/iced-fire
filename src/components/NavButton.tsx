import React from 'react';

const style = {
    position: 'fixed' as const,
    top: '3px',
    left: '3px'
  }

interface Props {
    title: string;
    onClick(): any;
}

export const Button: React.FC<Props> = (props) => {
  return (
    <div style={style}>
      <input type='button' value={props.title} onClick={props.onClick} />
    </div>
  );
};
