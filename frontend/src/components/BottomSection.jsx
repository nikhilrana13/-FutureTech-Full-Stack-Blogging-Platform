import React from 'react';
import icon5 from "../assets/icon5.png"
import { ArrowRight } from 'lucide-react';

const BottomSection = () => {
  return (
    <section className='pt-[3rem] pb-[5rem] md:px-[100px]  bg-[#1A1A1A] px-4 '>
        <div className=''>
            <div className='flex flex-col  sm:p-10 md:items-center md:flex-row gap-10'>
                {/* for mobile */}
                <div className='flex flex-col sm:hidden p-3  gap-4'>
                 <div className='flex items-center gap-4 '>
                    <img src={icon5} alt="" className=' w-[50px] h-[50px] sm:w-[100px] sm:h-[100px]' />
                    <span className='p-2 rounded-md w-fit bg-[#333333] text-white text-[0.5rem] '>Learn, Connect, and Innovate</span>
                 </div>
              
                <h3 className='text-white text-[1.5rem] sm:text-[2rem] font-[700]'>Be Part of the Future Tech Revolution</h3>
                <p className='text-[#7E7E81] leading-6 text-sm'>Immerse yourself in the world of future tecgnology,</p>
              </div>
              {/* for desktop */}
               <div className='hidden sm:flex items-center gap-8'>
                 
                <img src={icon5} alt="" className='  sm:w-[100px] sm:h-[100px]' />
                <div className='flex flex-col gap-4'>
                <span className='p-2 rounded-md w-fit  bg-[#333333] text-white text-sm '>Learn, Connect, and Innovate</span>
                 
                <h3 className='text-white text-[1.5rem] sm:text-[2rem] font-[700]'>Be Part of the Future Tech Revolution</h3>
                <p className='text-[#7E7E81] leading-6 text-sm'>Immerse yourself in the world of future technology. Explore our comprehensive resources, connect with fellow tech enthusiasts, and drive innovation in the industry. Join a dynamic community of forward-thinkers.</p>
                    </div>
               
              </div>
            </div>
        </div>
        <div className='rounded-md w-full flex flex-col md:flex-row gap-4 p-4 bg-[#000000]'>
          <div className='flex w-full  rounded-md bg-[#1A1A1A] p-10 md:w-1/2 flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <span className='text-white'>Resource Acesss</span>
                 <ArrowRight className='bg-[#FFD11A] text-black cursor-pointer w-8 h-8 p-2 rounded-full' />
            </div>
             <p className='text-[#7E7E81] leading-6 text-sm'>Visitors can access a wide range of resources,<br/>including ebooks, whitepapers, reports.</p>
          </div>
          <div className='flex w-full  rounded-md bg-[#1A1A1A] p-10 md:w-1/2 flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <span className='text-white'>Community Forum</span>
                 <ArrowRight className='bg-[#FFD11A] text-black cursor-pointer w-8 h-8 p-2 rounded-full' />
            </div>
             <p className='text-[#7E7E81] leading-6 text-sm'>Join our active community forum to discuss industry<br /> trends, share insights, and collaborate with peers.</p>
          </div>
          <div className='flex w-full  rounded-md bg-[#1A1A1A] p-10 md:w-1/2 flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <span className='text-white'>Resource Acesss</span>
                 <ArrowRight className='bg-[#FFD11A] text-black cursor-pointer w-8 h-8 p-2 rounded-full' />
            </div>
             <p className='text-[#7E7E81] leading-6 text-sm'>Visitors can access a wide range of resources,<br/>including ebooks, whitepapers, reports.</p>
          </div>



        </div>
      
    </section>
  );
}

export default BottomSection;
