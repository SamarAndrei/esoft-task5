import React from 'react';
import './MyButton.css'

export const MyButton = (props) => {
    return (
        <button className='myButton' onClick={props.onClick} >
            {props.description}
        </button>
    );
};

