import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const BlogCard = ({ blogId, name, category, date, title, likes, comments, profilePicture, introduction,AddlikeAndDislike}) => {
    return (
        <div className='flex border-t border-[#7E7E81]   sm:w-full  justify-between gap-5 flex-wrap p-4 md:p-[3rem]  '>
            <div className='flex gap-6'>
                <Avatar>
                    <AvatarImage src={profilePicture} alt='profile picture' className='w-10 h-10 rounded-full' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-1'>
                    <span className='text-white font-bold' >{name}</span>
                    <span className='text-[#7E7E81]'>{category}</span>
                </div>
            </div>
            <div className='flex  flex-col w-full p-2 sm:p-5 gap-5'>
                <span className='text-[#7E7E81]'>{date}</span>
                <div className='flex items-center flex-wrap   justify-between gap-5'>
                    <div className='flex flex-col gap-3 '>
                        <h3 className='text-white text-[1rem]   font-bold'>{title}</h3>
                        <p className=' text-[#7E7E81] text-sm'>{introduction.substring(0, 100)}</p>

                    </div>
                    <div className=''>
                        <NavLink to={`/blog/${blogId}`} >
                            <Button className='bg-[#333333] w-full md:w-fit text-[#7E7E81] hover:text-white text-sm' >View Blog <ArrowRight className=' text-[#FFD11A] cursor-pointer w-8 h-8 ' /></Button>
                        </NavLink>
                    </div>

                </div>
                <div className='flex gap-3 rounded-full'>
                    <button onClick={AddlikeAndDislike} className='bg-[#333333]   w-full md:w-fit text-[#98989A] rounded-full px-4 py-2  text-sm '>💗{likes}</button>
                    <button className='bg-[#333333]  w-full md:w-fit text-[#98989A] rounded-full px-4 py-2 text-sm '>💬 {comments}</button>
                </div>

            </div>

        </div>
    );
}

export default BlogCard;
