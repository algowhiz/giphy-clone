import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGifContext } from '../context/context';
import FilterGif from '../components/FilterGif';
import Gif from '../components/Gif';

const SearchPage = () => {

  const [searchRes, setSearchRes] = useState([]);

  const { query } = useParams();
  const { gf, filter, setFilter, favorite ,gifs} = useGifContext();

  const fetchSearchQuery = async () => {
    const { data } = await gf.search(query, {
      soet: 'relevant',
      lang: 'en',
      type: filter,
      limit: 20,
    })
    setSearchRes(data);
  }

  useEffect(() => {
    fetchSearchQuery();
  }, [filter])




  return (
    <div className='my-4 mx-2'>
      <h1 className='text-4xl pb-3 font-extrabold' >{query}</h1>
      <FilterGif alignLeft={true} />
      {
        searchRes.length > 0 ? (
          <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-5'>
            {searchRes.map((gif) => {
              return <Gif gif={gif} key={gif.id} />
            })}
          </div>
        ) : (
          <span>No GIFs For ${query} . Try Searching for Sticker insted ?</span>
        )
      }
    </div>
  )
}

export default SearchPage