import React , {useEffect} from 'react'
import { useGifContext } from '../context/context';
import Gif from '../components/Gif'
import FilterGif from '../components/FilterGif';
const Home = () => {

  const { gf, filter, setFilter, favorite ,setGifs ,gifs} = useGifContext();

  const fetchTrendingGifs = async () => {
    const {data} = await gf.trending({
      limit:20,
      type:filter,
      rating:'g',
    })
    setGifs(data);
    console.log(data);
    console.log("hi");
  };

  useEffect(()=>{
    fetchTrendingGifs();
  },[filter])


  return (
    <div>
      <img src="/banner.gif" alt="earth banner" className=" mt-2 rounded w-full"/>

      <FilterGif showTrending={true}/>

      <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-5'>
        {gifs.map((gif)=>{
          return <Gif gif={gif} key={gif.id} />
        })}
      </div>

    </div>
  )
}

export default Home