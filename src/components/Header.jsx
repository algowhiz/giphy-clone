import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo2.png';
import { IoMdMore } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { useGifContext } from '../context/context';
import GifSearch from './GifSearch';
import { RxCross2 } from "react-icons/rx";
import { MdFavorite } from "react-icons/md";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const { gf, filter, setFilter, favorite } = useGifContext();

  const fetchGifCategories = async () => {
    try {
      const { data } = await gf.categories();
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  useEffect(() => {
    if (showCategories) {
      const id = setInterval(() => {
        setShowCategories(false);
      }, 5000);

      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [showCategories]);

  const handleShowCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <nav>
      <div className='relative flex gap-4 justify-between items-center mb-2'>
        <Link to='/' className='flex gap-2'>
          <img src={logo} className='w-11' alt="Giphy Logo" />
          <h1 className='text-5xl font-bold tracking-tight cursor-pointer'>GIPHY</h1>
        </Link>
        {
          categories.slice(0, 5).map((category) => {
            return <Link key={category.name} to={`/${category.name_encoded}`} className='px-4 py-1 hover:gradient border-b-4 hidden lg:block'>{category.name}</Link>
          })
        }
        <Link className='py-0.5 hover:gradient border-b-4 hidden lg:block'>
          <IoMdMore onClick={handleShowCategories} size={25} />
        </Link>

        {favorite?.length > 0 && <div className='h-9  sm:bg-gray-700 pt-1.5 px-6 cursor-pointer rounded'>
          <Link to='/favorite' className='hidden sm:block' >Favorite GIFs</Link>
          <Link to='/favorite' className='sm:hidden flex items-center hover:scale-105 mb-4 justify-center'> <MdFavorite className={`text-red-700`} size={35} /></Link>
        </div>}
        <button>
          {showCategories ? <RxCross2 onClick={handleShowCategories} className='text-sky-400 block lg:hidden' size={30} /> : <FaBars onClick={handleShowCategories} className='text-sky-400 block lg:hidden' size={30} />}
        </button>
        {showCategories && (
          <div className='absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20 flex gap-5 flex-wrap items-center justify-center'>
            <span className='font-semibold text-2xl font-sans '>Categories </span><br />
            <hr className='bg-gray-100 my-5 w-full h-1 border-none' />
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
              {categories.map((category, index) => (
                <Link key={index} className='font-bold category-link' to={`/${category.name_encoded}`}>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <GifSearch />
    </nav>
  );
};

export default Header;
