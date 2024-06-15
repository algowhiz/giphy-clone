import React from 'react';
import { Link } from 'react-router-dom';

const Gif = ({ gif, hover = true }) => {
  return (
    <Link to={`/${gif.type}s/${gif.slug}`}>
      <div className='w-full mb-2 relative cursor-pointer group aspect-video '>
        <img
          src={gif?.images?.fixed_width.webp}
          alt={gif?.title}
          className='w-full object-cover rounded transition-all duration-500'
        />
        {hover && (
          <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <div className='text-center text-white'>
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className='h-16 w-16 rounded-full mx-auto mb-2'
              />
              <span>{gif?.user?.display_name}</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Gif;
