import React from 'react';
import { useGifContext } from '../context/context';
import { IoMdTrendingUp } from "react-icons/io";

const filters = [
    {
        title: "GIFs",
        value: 'gifs',
        background: 'bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500',
    },
    {
        title: "Stickers",
        value: 'stickers',
        background: 'bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500',
    },
    {
        title: "Text",
        value: 'text',
        background: 'bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500',
    }
];

const FilterGif = ({ alignLeft = false, showTrending = false }) => {
    const { filter, setFilter } = useGifContext();

    return (
        <div className={`flex my-3 gap-3 ${alignLeft ? "" : "justify-end"} ${showTrending ? "justify-between flex-col sm:flex-row items-center" : ""} `}>
            {showTrending && (
                <div className="flex items-center">
                    <IoMdTrendingUp size={25} className="text-teal-400 mr-1" />
                    <span className="text-gray-100">Trending</span>
                </div>
            )}

            <div className='flex min-w-80 rounded bg-gray-800 mr-3 gap-4'>
                {filters.map((f) => (
                    <span
                        key={f.title}
                        className={`py-2 w-1/3 text-center rounded-xl cursor-pointer ${filter === f.value ? f.background : ""}`}
                        onClick={() => setFilter(f.value)}
                    >
                        {f.title}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default FilterGif;
