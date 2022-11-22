import React from 'react';
import '../App.css';

function Button({title,onClickCall}) {
  return (
        <button className="button" onClick={onClickCall}>{title}</button>
  );
}

export default Button;
