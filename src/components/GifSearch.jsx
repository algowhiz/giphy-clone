import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { HiOutlineSearch } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
const GifSearch = () => {

    const [query,setQuery] = useState("");
    const navigate= useNavigate();

    const searchGifs = async () =>{
        if(query.trim()=='')
            return;
        else{
            handelCancel();
            navigate(`/search/${query}`);
        }
    }

    const handelCancel = () =>{
        setQuery("");
    }

  return (
    <div className='flex relative'>
        <input 
            type="text" 
            value={query}
            onChange={(e)=> setQuery(e.target.value)}
            placeholder='Search all the GIFs and Stickers'
            className='w-full p-3 pl-4 pr-14 text-sm md:p-6 md:text-2xl text-black rounded-tl border border-white outline-none '
        />

        {
            query && <button className='absolute bg-gray-600 opacity-90 rounded-full flex justify-center items-center right-20 top-1/2 -translate-y-1/2 transform  ' onClick={handelCancel}>
                <MdCancel size={20}/>
            </button>
        }

        <button className='bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br' onClick={searchGifs}>
            <HiOutlineSearch size={35} className='-scale-x-100' />
        </button>
    </div>
  )
}

export default GifSearch