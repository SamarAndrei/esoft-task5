import React, { useState } from 'react';
import Card from '../components/Card/Card';
import films from '../Films.json';
import { useParams } from 'react-router-dom';
import { SideBar } from '../components/SideBar/SideBar';
import { Comment } from '../components/Comment/Comment';
import { useSelector } from 'react-redux';

export const Film = () => {

    let { filmId } = useParams();
    const film = films.films.filter(item => item.id === parseInt(filmId))
    const filmsLike = films.films.filter(item => item.genre === film[0].genre && item.id !== film[0].id)

    const [comm, setComm] = useState([])
    const [error, setError] = useState(false)

    const fvrtlst = useSelector(state => state.favorite)

    const postComm = () => {
            
        const comment = document.getElementById('comment').value; 
        if(validatorComm(comment)) {
            setError(false)
            setComm(prevState => [...prevState, comment]);
        } else {
            setError(true)
        }
    }

    const validatorComm = (comm) => {
        if(comm) {
            return true
        } else {
            return false
        }
    }

    return (
        <div>
            <h1>{filmId}</h1>
            <ul> 
                <li style={{listStyleType: 'none'}}>Name:{film[0].name}</li>
                <li style={{listStyleType: 'none'}}>Rating:{film[0].rating}</li>
                <li style={{listStyleType: 'none'}}>Description:{film[0].description}</li> 
                <li style={{listStyleType: 'none'}}>Actors:{film[0].actors}</li> 
                <li style={{listStyleType: 'none'}}>Genre:{film[0].genre}</li> 
            </ul>
            {filmsLike.length > 0 && 
                <div>
                    <h1>Похожие фильмы:</h1>
                    {filmsLike.map(item => <Card key={item.id} props={item}/>)} 
                </div>
            }
            <div>
                <h1>Комментарии:</h1>
                <form >
                    <p><strong>Введите коммент:</strong></p>
                    {!error ? <textarea id='comment' rows="10" cols="45" ></textarea > : <textarea id='comment' rows="10" cols="45" style={{background: 'red'}}/> }
                    <input type="button" onClick={postComm} value="Отправить" />
                </form>
            </div>
            
            {comm.map((item, index) => <Comment key={index} props={item}/>)}
            
            <SideBar props={fvrtlst}/>        
        </div>
    );
};

