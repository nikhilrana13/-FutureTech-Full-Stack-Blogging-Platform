import React from 'react';

const SimilarNews = ({ image, title, category,}) => {
    return (
        <div>
           <div className='flex flex-col gap-5 p-2 rounded-md bg-[#1A1A1A]'>
                <img src={image} alt="picture" className='w-full rounded-md h-48 object-cover' />
            <div className='flex flex-col gap-2'>
                    <h3 className='text-white text-sm font-semibold line-clamp-2'>{title}</h3>
                    <span className='text-[#7E7E81] text-xs'>{category}</span>
            </div>
            </div>
        </div>
    );
}

export default SimilarNews;
