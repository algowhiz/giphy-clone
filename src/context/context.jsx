import React, { createContext, useState, useContext, useEffect } from "react";
import { GiphyFetch } from '@giphy/js-fetch-api';

// Create a context for the GIFs
const GifContext = createContext();

const gf = new GiphyFetch(import.meta.env.VITE_API_KEY);

const GifProvider = ({ children }) => {
    const [gifs, setGifs] = useState([]);
    const [filter, setFilter] = useState('');
    const [favorite, setFavorite] = useState([]);

    const addToFav = ( id =>{
        if(favorite?.includes(id)){
            const updateFavList = favorite.filter((it)=> it!==id);
            localStorage.setItem('favGif',JSON.stringify(updateFavList));
            setFavorite(updateFavList);
        }else{
            const updatedFav=[...favorite];
            updatedFav.push(id);
            localStorage.setItem('favGif',JSON.stringify(updatedFav));
            setFavorite(updatedFav);
        }
    });

    useEffect(()=>{
        const favorite = JSON.parse(localStorage.getItem('favGif'));
        setFavorite(favorite);
    },[])

    return (
        <GifContext.Provider value={{ gf, gifs, setGifs, filter, setFilter, favorite, setFavorite ,addToFav}}>
            {children}
        </GifContext.Provider>
    );
};

export const useGifContext = () => {
    return useContext(GifContext);
};

export default GifProvider;
