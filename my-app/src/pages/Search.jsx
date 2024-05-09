import React, { useEffect, useState } from 'react';
import films from '../Films.json';
import Card from '../components/Card/Card';
import { SideBar } from '../components/SideBar/SideBar';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export const Search = () => {
    const [data, setData] = useState(films.films)
    const fvrtlst = useSelector(state => state.favorite)

    const [searchParams, setSearchParams] = useSearchParams();

    const genreQuery = searchParams.getAll('genre') || '';
    const postQuery = searchParams.get('post') || '';

    const [search, setSearch] = useState(postQuery);

    const [checkedGenres, setCheckedGenres] = useState({
        'Horror' : false,
        'Documentary' : false,
        'Romcom' : false,
        'Action' : false,
        'Comedy' : false,
        'Drama' : false,
    });

    useEffect(() => { 
        if(postQuery) {
            setData(films.films.filter(film => film.name.includes(postQuery))); 
        } else {
            setData(films.films)
        }
    }, [postQuery]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;


        const query = form.search.value;

    
        const isSelectedGenres = [];
        for (let key in checkedGenres) {
            if (checkedGenres[key]) {
                isSelectedGenres.push(key);
            }
        }
    
        const params = {};

        if (query.length) params.post = query;


        if (isSelectedGenres.length > 0) {
            params.genre = isSelectedGenres;
        }
        setSearchParams(params);
    }

    return (
        <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <input type="search" name="search" value={search} onChange={e => setSearch(e.target.value)}/>
                Horror: <input type="checkbox" onChange={(e) => setCheckedGenres(prev => ({ ...prev, Horror: e.target.checked }))} name='Horror' checked={checkedGenres.Horror}/>
                Documentary: <input type="checkbox" onChange={(e) => setCheckedGenres(prev => ({ ...prev, Documentary: e.target.checked }))} name='Documentary' checked={checkedGenres.Documentary}/>
                Romcom: <input type="checkbox" onChange={(e) => setCheckedGenres(prev => ({ ...prev, Romcom: e.target.checked }))} name='Romcom' checked={checkedGenres.Romcom}/>
                Action: <input type="checkbox" onChange={(e) => setCheckedGenres(prev => ({ ...prev, Action: e.target.checked }))} name='Action' checked={checkedGenres.Action}/>
                Comedy: <input type="checkbox" onChange={(e) => setCheckedGenres(prev => ({ ...prev, Comedy: e.target.checked }))} name='Comedy' checked={checkedGenres.Comedy}/>
                Drama: <input type="checkbox" onChange={(e) => setCheckedGenres(prev => ({ ...prev, Drama: e.target.checked }))} name='Drama' checked={checkedGenres.Drama}/>

                <input type="submit" value="Search" />
                {genreQuery.length > 0 ? 
                data.filter(film => { return genreQuery.some(genre => film.genre.includes(genre)); }).map((post) => (
                    <Card key = {post.id} props = {post}/>
                )) : data.map((post) => (
                    <Card key = {post.id} props = {post}/>
                ))
            }
            </form>
            <SideBar props={fvrtlst}/>
        </div>
    );
};

