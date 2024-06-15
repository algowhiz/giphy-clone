import React, { useEffect, useState } from 'react';
import Gif from '../components/Gif';
import { useGifContext } from '../context/context';

const Favorite = () => {
  const [fav, setFav] = useState([]);
  const { gf, favorite } = useGifContext();

  const fetchFavGifs = async () => {
    try {
      console.log('Fetching favorite GIFs with IDs:', favorite);
      if (favorite.length > 0) {
        const gifs = await Promise.all(
          favorite.map(async (id) => {
            if (id) {  
              try {
                const { data } = await gf.gif(id);
                return data;
              } catch (error) {
                console.error(`Error fetching GIF with id ${id}:`, error);
                return null;
              }
            }
            return null;
          })
        );
        setFav(gifs.filter(Boolean)); 
      } else {
        setFav([]);
      }
    } catch (error) {
      console.error('Error fetching favorite GIFs:', error);
    }
  };

  useEffect(() => {
    fetchFavGifs();
  }, [favorite]);

  return (
    <div className="mt-2">
      <span className="faded-text">My Favorites</span>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-2">
        {fav.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
