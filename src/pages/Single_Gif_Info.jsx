import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGifContext } from '../context/context';
import Gif from '../components/Gif';
import { FaArrowUp, FaArrowDown, FaExternalLinkAlt, FaPaperPlane } from "react-icons/fa";
import FollowOn from '../components/FollowOn';
import { MdFavorite } from "react-icons/md";
import { ImEmbed2 } from "react-icons/im";

const contentType = ['gifs', 'stickers', 'texts'];

const Single_Gif_Info = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState(null);
  const [relatedGif, setRelatedGif] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const { gf, addToFav ,favorite } = useGifContext();

  const fetchGif = async () => {
    try {
      const gifId = slug.split('-').pop();
      const { data } = await gf.gif(gifId);
      const { data: relatedData } = await gf.related(gifId, { limit: 10 });
      setGif(data);
      setRelatedGif(relatedData);
    } catch (error) {
      console.error('Error fetching gif data:', error);
    }
  };

  useEffect(() => {
    if ( !contentType.some(content => content === type)) {
      console.error("Invalid Content Type");
      return;
    }
    fetchGif();
  }, [type, slug]);
  
  const handleShare = () => {
    
    const tempInput = document.createElement('input');
    tempInput.value = gif.url; 
    document.body.appendChild(tempInput);
  
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); 
    document.execCommand('copy');
  
    document.body.removeChild(tempInput);
    alert('GIF URL copied to clipboard!');
  };

  const handleEmbed = () => {
    const embedCode = `<iframe src="${gif.url}" width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>`;

    const tempInput = document.createElement('input');
    tempInput.value = embedCode; 
    document.body.appendChild(tempInput);
  
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); 
    document.execCommand('copy');
  
    document.body.removeChild(tempInput);
    alert('GIF URL copied to clipboard!');
    
    }

  if (!gif) {
    return <div>Loading...</div>;
  }
  const isFavorite = favorite.includes(gif?.id);
  const description = gif?.user?.description ?? '';
  const isLongDescription = description.length > 130;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-4 my-10 gap-4 p-3'>
      <div className='hidden sm:block sm:col-span-1 ml-2'>
        {gif?.user && (
          <>
            <div className='flex gap-1 items-center'>
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className='h-10 rounded-full'
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="text-gray-500">{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <div className='py-4'>
                <p>
                  {readMore ? gif.user.description : `${gif.user.description.slice(0, 100)}...`}
                  {isLongDescription && (
                    <button
                      className='flex items-center gap-2 text-blue-500'
                      onClick={() => setReadMore(!readMore)}
                    >
                      {readMore ? 'read less' : 'read more'}
                      {readMore ? <FaArrowUp /> : <FaArrowDown />}
                    </button>
                  )}
                </p>
              </div>
            )}
          </>
        )}
        <FollowOn />
        <div className='border-t my-4'></div>

        {gif?.source && (
          <div>
            <p className='text-xl text-gray-400 font-bold mb-2'>Source:</p>
            <div className="flex items-center text-sm font-bold gap-1">
              <FaExternalLinkAlt size={16} className='mr-2' />
              <a href={gif.source} target='_blank' rel='noopener noreferrer' className='truncate'>{gif.source}</a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            {/* -- Mobile UI -- */}
            <div className='mt-4 sm:hidden '>
              <div className='flex gap-1 items-center'>
                <img
                  src={gif?.user?.avatar_url}
                  alt={gif?.user?.display_name}
                  className='h-10 rounded-full'
                />
                <div className="px-2">
                  <div className="font-bold">{gif?.user?.display_name}</div>
                  <div className="text-gray-500">{gif?.user?.username}</div>
                </div>
              </div>
              <div className='flex justify-start gap-4 mt-3 ml-1'>
                <button onClick={() => addToFav(gif?.id)}>
                  <MdFavorite className={`${isFavorite ? "text-red-700" : ""}`} size={35} />
                </button>
                <button  onClick={handleShare}>
                  <FaPaperPlane  size={35} />
                </button>
                <button onClick={handleEmbed}>
                  <ImEmbed2 size={35} />
                </button>
              </div>
            </div>
            {/* -- Mobile UI -- */}
          </div>

          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button className="flex gap-5 items-center font-bold text-lg" onClick={() => addToFav(gif?.id)}>
              <MdFavorite className={`${isFavorite ? "text-red-700" : ""} hover:text-red-600 `} size={30} />
              Favorite
            </button>
            <button onClick={handleShare} className="flex gap-6 items-center font-bold text-lg">
              <FaPaperPlane size={25} className='hover:text-blue-600' />
              Share
            </button>
            <button onClick={handleEmbed} className="flex gap-5 items-center font-bold text-lg">
              <ImEmbed2 className='hover:text-orange-600' size={30} />
              Embed
            </button>
          </div>
        </div>

        <div className='mt-4'>
          <span className="font-extrabold p-2">Related GIFs</span>
          <div className="mt-4 columns-2 md:columns-3 gap-2">
            {relatedGif.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single_Gif_Info;
