import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useState } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import FormattedBlogContent from './FormattedBlogContent';
import ExtractTableofcontent from './ExtractTableofcontent';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import SimilarNews from './SimilarNews';
import { useSelector } from 'react-redux';
import BottomSection from './BottomSection';
import Footer from './Footer';
import toast from 'react-hot-toast';
const EachBlogDetail = () => {
   const [loading, setLoading] = useState(false);
   const similarblogs = useSelector((state) => state.Blogs.allblogs)
   // console.log("similarBlogs", similarblogs);
   const [blogdetail, setBlogDetail] = useState({});
   const { id } = useParams();

   // fetch blog details
   useEffect(() => {
      const fetchBlogdetails = async () => {
         try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/blog/${id}`, { withCredentials: true });
            if (response.data) {
               setBlogDetail(response.data?.blog)

            }
         } catch (error) {
            console.log("failed to fetch blog details", error);
         } finally {
            setTimeout(() => {
               setLoading(false);
            }, 2000);

         }
      }
      fetchBlogdetails();
   }, [id])
   // console.log("blogdetail",blogdetail);
   const tableofcontent = ExtractTableofcontent({ content: blogdetail?.content }) || [];
   // add like to blog
   const AddlikeAndDislike = async(blogid)=>{
    try {
      const response = await axios.post(`http://localhost:3000/api/like/addlike/${blogid}`,{},{withCredentials:true});
      // console.log("response",response);
      if(response.data){
        toast.success(response?.data?.message ||"liked the post");
        // updated the blog state
        const updatedBlog = response?.data?.updatedBlog
        if(updatedBlog){
          setBlogDetail(updatedBlog)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message ||"failed to like the post");
    }
   }

   return (
      <div>
         <Navbar />
         {/* section 1 */}

         {
            loading ? (
               <Loader2 className=' animate-spin mx-auto mt-10 text-white text-[1.5rem]'>loading...</Loader2>
            ) : blogdetail && Object.keys(blogdetail).length > 0 ? (
               <>
                  <section>
                     <div className='min-h-[400px] bg-cover  relative bg-center' style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7)),url(${blogdetail?.image})` }}>
                        <h1 className='text-[1.5rem] sm:text-[1.5rem] text-white absolute top-[18rem] md:top-[20rem] left-0 right-0    font-bold text-center'>{blogdetail?.title}</h1>
                     </div>
                     {/* content */}
                     <div className='content w-full    flex flex-col-reverse md:flex-row  gap-0  border-[#7E7E81]'>
                        <div className='w-full md:w-[60%] min-h-screen'>
                           <div className=' p-5 md:p-[5rem]  border-t border-[#7E7E81]'>
                              <div className='flex flex-col gap-4  p-3'>
                                 <span className='text-white text-[1.5rem] font-bold'>Introduction</span>
                                 <p className='text-[#7E7E81] text-sm leading-7'>{blogdetail?.introduction}</p>
                              </div>
                           </div>
                           <div className=' p-5 md:p-[5rem]   border-t border-[#7E7E81]'>
                              <div className='flex flex-col  gap-5  p-3'>
                                 <span className='text-white text-[1.5rem]   font-bold'>{blogdetail?.title}</span>
                                 {/* <p className='text-[#7E7E81] text-sm leading-7'>{blogdetail?.content}.</p>
                     */}
                                 <FormattedBlogContent content={blogdetail?.content} />
                              </div>
                           </div>
                        </div>

                        <div className='w-full md:w-[40%]   flex flex-col border border-[#7E7E81]'>
                           <div className='flex gap-3 border-b border-[#7E7E81] p-[2rem] sm:p-[3rem] '>
                              <button onClick={()=>AddlikeAndDislike(blogdetail?._id)} className='bg-[#333333]  w-full md:w-fit text-[#98989A] rounded-full px-4 py-2  text-sm '>💗{blogdetail?.likes.length}</button>
                              <button className='bg-[#333333]  w-full md:w-fit text-[#98989A] rounded-full px-4 py-2 text-sm '>👀24.k</button>
                           </div>

                           <div className='p-10 flex flex-col gap-8 '>
                              <div className='flex flex-col gap-3'>
                                 <div className='flex justify-between'>
                                    <div className='flex flex-col gap-3'>
                                       <span className='text-[#7E7E81]'>Publication Date</span>
                                       <span className='text-white'>{new Date(blogdetail?.createdAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</span>
                                    </div>
                                    <div className='flex flex-col  w-[120px]  gap-3'>
                                       <span className='text-[#7E7E81]'>Category</span>
                                       <span className='text-white'>{blogdetail?.category}</span>
                                    </div>

                                 </div>
                                 <div className='flex justify-between'>
                                    <div className='flex flex-col gap-3'>
                                       <span className='text-[#7E7E81]'>Reading Time</span>
                                       <span className='text-white'>10 min</span>
                                    </div>
                                    <div className='flex flex-col w-[120px]    gap-3'>
                                       <span className='text-[#7E7E81]'>Author Name</span>
                                       <span className='text-white'>{blogdetail?.author}</span>
                                    </div>

                                 </div>

                              </div>
                              {/* table of content */}
                              <div className='flex flex-col gap-4'>
                                 <h4 className='text-[#7E7E81]'>Table of Contents</h4>
                                 <div className='bg-[#333333] min-h-[300px] rounded-md p-10'>
                                    <ul className=' flex flex-col gap-4'>
                                       {
                                          tableofcontent?.length > 0 ? (
                                             tableofcontent?.map((blog, index) => {
                                                return (
                                                   <li key={index} className='text-white text-sm cursor-pointer list-disc'>{blog}</li>

                                                )
                                             })
                                          ) : (
                                             <li className='text-white text-sm  list-disc'>Table of Content Not Found</li>
                                          )
                                       }
                                    </ul>
                                 </div>


                              </div>

                           </div>
                        </div>
                     </div>
                     {/* similar news */}
                     <section className=' p-[2rem] border-[#7E7E81] rounded-md md:p-[5rem] border px-4'>
                        <div className='flex flex-col gap-5 '>
                           <div className='flex justify-between items-center'>

                              <h3 className='text-gray-300 text-sm sm:text-[1.2rem]'>Similar News</h3>
                              <div>
                                 <NavLink to='/news'>
                                    <Button className='bg-[#333333] w-full md:w-fit text-[#7E7E81] hover:text-white text-sm' >View All News<ArrowRight className=' text-[#FFD11A] cursor-pointer w-8 h-8  ' /></Button>
                                 </NavLink>

                              </div>

                           </div>
                           {
                              similarblogs?.length > 0 ? (
                                 <div className='grid grid-cols-1 p-3  cursor-pointer md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                    {similarblogs?.map((blog) => {
                                       return (
                                          <NavLink to={`/blog/${blog?._id}`}>
                                             <SimilarNews key={blog._id}  title={blog?.title.slice(0, 50)} category={blog?.category}  image={blog?.image} />
                                          </NavLink>
                                       )
                                    })}
                                 </div>

                              ) : (
                                 <h3 className='text-white text-center'>No Similar News Found</h3>
                              )
                           }

                        </div>



                     </section>
                  </section>
                  <BottomSection />
                  <Footer />
               </>
            ) : (
               <div className='mt-10'>
                  <h3 className='text-white text-center'>No Blog Found</h3>
               </div>
            )
         }

      </div>
   );
}

export default EachBlogDetail;
