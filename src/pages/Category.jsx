import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGifContext } from '../context/context'; 
import Gif from '../components/Gif';
import FollowOn from '../components/FollowOn';

const Category = () => {
  const [res, setRes] = useState([]);
  const { category } = useParams();
  const { gf } = useGifContext();

  const fetchCategoryQuery = async () => {
    const { data } = await gf.gifs(category, category);
    setRes(data);
  }

  useEffect(() => {
    fetchCategoryQuery();
  }, [category]);

  return (
    <div className='flex flex-col md:flex-row gap-5 my-4 ml-3'>
      <div className='w-full md:w-1/4'>
        {res.length > 0 && <Gif gif={res[0]} />}
        <span className='text-gray-400 text-sm pt-2'>
          Don&apos;t tell me, GIF it to me!
        </span>
        <FollowOn />
        <div className='divider' />
      </div>
      <div className='flex-grow'>
        <div>
          <h2 className='text-4xl pb-1 font-extrabold capitalize'>{category.split('-').join(" & ")} GIFs</h2>
          <h2 className='text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer'>@{category}</h2>
          {
            res.length > 0 && (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                {res.slice(1).map((gif) => (
                  <Gif gif={gif} key={gif.id} />
                ))}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Category;
