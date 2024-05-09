import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Main } from "./pages/Main";
import { Search } from './pages/Search'
import { Film } from "./pages/Film";

export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/:filmId" element={<Film/>}/>
        </Routes>
    </BrowserRouter>
);