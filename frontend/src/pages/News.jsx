import Navbar from '@/components/Navbar';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import { useDispatch } from 'react-redux';
import { SetBlogs } from '@/redux/BlogsSlice';
import BottomSection from '@/components/BottomSection';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';


const News = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [filterblog, setFilterBlog] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  // console.log("selectedCategory",selectedCategory)


  const Categories = [
    "All",
    "Technology",
    "Health",
    "Politics",
    "Lifestyle",
    "Entertainment",
    "Education",
    "Sports",
    "Web Development"
  ]
  // fetch all blogs 
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/blog/allblogs', { withCredentials: true });
        if (response.data) {
          setAllBlogs(response?.data?.Blogs)
          dispatch(SetBlogs(response?.data?.Blogs))
          setFilterBlog(response?.data?.Blogs)
        }
      } catch (error) {
        console.log("failed to fetch all blogs", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }

    }
    fetchBlogs();
  }, []);
  // handle categories
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilterBlog(allBlogs);
      // console.log("allblogs",allBlogs);
    } else {
      const filteredBlogs = allBlogs.filter((blog) => blog.category?.toLowerCase().replace(/\s/g, "") === selectedCategory?.toLowerCase().replace(/\s/g, ""));
      setFilterBlog(filteredBlogs);
    }
  }, [selectedCategory, allBlogs]);

   const AddlikeAndDislike = async(blogid)=>{

    try {
      const response = await axios.post(`http://localhost:3000/api/like/addlike/${blogid}`,{},{withCredentials:true});
      // console.log("response",response);
      if(response.data){
        toast.success(response?.data?.message ||"liked the post");
        // updated the blog state
        const updatedBlog = response?.data?.updatedBlog
        if(updatedBlog){
          setAllBlogs((prevBlogs)=>prevBlogs.map((blog)=> blog._id === updatedBlog._id ? updatedBlog : blog))
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message ||"failed to like the post");
    }
   }
  return (
    <div className='w-full'>
      <Navbar />
      <div className='main'>
         {/* section-1 */}
         <section className='py-10 md:px-[100px]  px-4 '>
            <div className=' flex flex-col  p-3 sm:p-10 sm:gap-5'>
                <h1 className=' flex items-center text-white text-[1.5rem] font-[600] sm:text-[2.5rem]'>Today's Headlines: Stay</h1>
                <p className='text-[0.8rem] flex flex-col md:flex-row  gap-3 sm:gap-10  text-[#7E7E81]'><span className='text-white text-[1.5rem] sm:text-[2.5rem] font-[600]'>Informed</span>Explore the latest news from around the world. We bring you up-to-the-minute updates on the most significant events, trends, and stories. Discover<br /> the world through our news coverage.</p>
            </div>
         </section>
         {/* section-2 */}
         <section className=' py-5 sm:py-10 md:px-[100px] px-4 bg-[#1A1A1A] '>
            <div className='flex  justify-between flex-wrap items-center py-[2rem] sm:py-[4rem] gap-4 sm:px-5 '>
              <div className='flex flex-col  gap-4'>
                <span className='p-2 rounded-md w-fit bg-[#333333] text-white text-[0.5rem] sm:text-sm '>Welcome to Our News Hub</span>
                <h3 className='text-white text-[1.5rem] sm:text-[2rem] font-[700]'>Discover the World of Headlines</h3>
              </div>
              <Button className='bg-[#333333] w-full md:w-fit text-[#7E7E81] hover:text-white text-[0.8rem] sm:text-sm' >View All News<ArrowRight className=' text-[#FFD11A] cursor-pointer w-8 h-8  ' /></Button>
            </div>
         </section>
         {/* section-3 */}
         <section className='News py-5 sm:py-10 md:px-[100px] px-4 '>
             {/* show Blogs based on categories */}
          <div className=''>
            <div className='categories w-full mx-auto  flex gap-4  sm:gap-[3rem] p-10 sm:p-[3rem]   overflow-x-auto scrollbar-hide whitespace-nowrap '>
              {
                Categories.map((category) => {
                  return (
                    <button key={category} onClick={() => setSelectedCategory(category)} className={`py-3 sm:py-5 px-[4rem] ${selectedCategory === category ? 'bg-yellow-400 text-black text-sm' : 'bg-[#1A1A1A] text-white text-sm'} rounded-md `}>{category}</button>
                  )
                })
              }
            </div>
            {/* Blogs */}
            <div className='blogs mt-10'>
              {
                loading ? (
                  <div>
                    <Loader2 className='animate-spin w-8 h-8 text-white mx-auto' />
                  </div>
                ) : filterblog?.length > 0 ? (
                  (selectedCategory === "All" ? filterblog.slice(0, 3) : filterblog).map((blog) => (
                      <BlogCard key={blog._id} blogId={blog._id} name={blog?.userId?.name} category={blog?.category} date={new Date(blog?.createdAt).toLocaleDateString('en-US',{month: 'long', day: '2-digit', year: 'numeric'})} title={blog?.title} likes={blog?.likes.length} comments={blog?.comments.length} profilePicture={blog.userId?.profilePicture || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} introduction={blog?.introduction} AddlikeAndDislike={() => AddlikeAndDislike(blog._id)} />
                  ))

                ) : (
                  <p className='text-center mt-12 text-gray-500'>No blogs found</p>
                )
              }

            </div>
          </div>

         </section>
         {/* bottom section */}
         <BottomSection />
         <Footer />
      </div>
    </div>
  );
}

export default News;
