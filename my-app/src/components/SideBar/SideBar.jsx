import React from 'react';
import './SideBar.css'
import { Link } from 'react-router-dom';

export const SideBar  = ({props}) => {
    return (
        <div className='side-bar'>
            <h2>Избранное:</h2>
            {props.map(item => <Link to={`/${props.id}`}><h1 key={item.id}>{item.name}</h1></Link>
        )}
        </div>
    );
}

