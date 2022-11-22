import React from 'react';
import '../App.css';

function Input({ labelTitle, id, name, value, handleChange }) {
    return (
        <div className="inputContainer">
            <label htmlFor={id}>
                {labelTitle}: 
                <input id={id} type="text" name={name} value={value} onChange={handleChange} />
            </label>
        </div>

    );
}

export default Input;