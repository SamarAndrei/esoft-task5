import React, { useState, useEffect } from 'react';
import './Card.css' 
import './Icon.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { аddToFavorite, deleteFromFavorite } from '../../store/addOrDelToFavoriteReducerActions';

const Card = ({props}) => {
    const [favorite, setFavorite] = useState(false)

    const fvrtlst = useSelector(state => state.favorite)
    const dispatch = useDispatch();

    const existInFvrtList =  fvrtlst.some(item => item.name === props.name);

    useEffect(() => {
        if(existInFvrtList){
            setFavorite(true);
        } else {
            setFavorite(false);
        }
    }, [existInFvrtList]);

    const handleClickFavorite = () => {
        if(favorite){
            setFavorite(false)
            dispatch(deleteFromFavorite(props))
        } else {
            setFavorite(true)
            dispatch(аddToFavorite(props))
        }
    }
    return (
        <div className='сard'>
            <span>
               { favorite && existInFvrtList ? 
               <img className='icon-favorite' onClick={handleClickFavorite} src='https://pngicon.ru/file/uploads/zvezda.png' alt='favorite'/> : 
               <img className='icon-favorite' onClick={handleClickFavorite} src='https://w7.pngwing.com/pngs/765/582/png-transparent-five-pointed-star-symbol-outline-red-star-angle-triangle-symmetry.png' alt='notfavorite'/>}
            </span>
            <ul> 
            <Link to={`/${props.id}`}><li style={{listStyleType: 'none'}}>Name:{props.name}</li></Link>
                <li style={{listStyleType: 'none'}}>Rating:{props.rating}</li>
                <li style={{listStyleType: 'none'}}>Description:{props.description}</li> 
                <li style={{listStyleType: 'none'}}>Actors:{props.actors}</li> 
                <li style={{listStyleType: 'none'}}>Genre:{props.genre}</li> 
            </ul> 
        </div>
    );
};

export default Card;