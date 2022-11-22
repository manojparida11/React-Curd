import React from 'react';
import '../App.css';

function LinkButton({title,onClickCall}) {
  return (
        <button className="linkButton" onClick={onClickCall}>{title}</button>
  );
}

export default LinkButton;
