import Navbar from '../components/Navbar';
import React, { use, useEffect, useState } from 'react';
import heroimg from '../assets/Group.png'
import { ArrowRight, Loader2 } from 'lucide-react';
import icon1 from "../assets/icon1.png"
import icon2 from "../assets/icon2.png"
import icon3 from "../assets/icon3.png"
import icon4 from "../assets/icon4.png"
import { Button } from '@/components/ui/button';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '@/components/BlogCard';
import TestiMonial from '@/components/TestiMonial';
import BottomSection from '@/components/BottomSection';
import Footer from '@/components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { SetBlogs } from '@/redux/BlogsSlice';
import toast from 'react-hot-toast';


const Home = () => {
  const location = useLocation();
  const user = useSelector((state) => state.Auth.user);
  // console.log("user", user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [filterblog, setFilterBlog] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  // console.log("selectedCategory",selectedCategory);


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
          // console.log("blogs", response?.data?.Blogs);
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
  },[location.pathname]) // whenever path changes fetch blogs 
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

  //  useEffect(()=>{
    //  console.log("filterblog",filterblog);
  //  },[filterblog])
  
  // add like and dislike function 
   const AddlikeAndDislike = async(blogid)=>{
    try {
      const response = await axios.post(`http://localhost:3000/api/like/addlike/${blogid}`,{},{withCredentials:true});
      console.log("response",response);
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
        <section className='section-1 py-10 sm:px-[100px]   px-4  '>
          <div className='flex flex-col md:flex-row    items-center '>
            <div className='w-full md:max-w-[600px]  h-auto  flex flex-col gap-5 p-5'>
              <h2 className='text-[#7E7E81] font-[700]'>Your Journey to Tomorrow Begins Here</h2>
              <h1 className='text-white font-[700] text-[2rem] md:text-[3rem]  w-full sm:max-w-[300px]'>Explore the Frontiers of Artificial Intelligence</h1>
              <p className='text-[#7E7E81] text-[1rem] w-full sm:max-w-[400px] '>Welcome to the epicenter of AI innovation. FutureTech AI  News is your passport to a world where machines think learn, and reshape the future. Join us on this visionary  expedition into the heart of AI.</p>
            </div>
            <div className='w-full md:max-w-[600px] h-auto' >
              <img src={heroimg} alt="" className='w-full ' />
            </div>
          </div>
          <div className=' w-full sm:max-w-[600px] py-5 px-2 flex flex-col md:flex-row gap-10'>
            <div className='max-w-[300px] p-4 '>
              <span className='text-white text-[1.8rem] sm:text-[3rem]'>300<span className='text-[#FFD11A]'>+</span></span>
              <p className='text-[#7E7E81] text-sm sm:max-w-[200px] font-[500]'>Resources Available</p>
            </div>
            <div className='max-w-[300px] p-4'>
              <span className='text-white text-[1.8rem] sm:text-[3rem]'>12k<span className='text-[#FFD11A]'>+</span></span>
              <p className='text-[#7E7E81] text-sm sm:max-w-[200px] font-[500]'>Total Downloads</p>
            </div>
            <div className='max-w-[300px] p-4 '>
              <span className='text-white text-[1.8rem] sm:text-[3rem]'>10k<span className='text-[#FFD11A]'>+</span></span>
              <p className='text-[#7E7E81] w-full sm:max-w-[200px]  text-sm font-[500]'>Active Users</p>
            </div>
          </div>
          <div className=' w-full p-5  flex flex-col md:flex-row gap-20'>
            <div className=' w-full flex flex-col gap-5 p-4 '>
              <img src={icon1} alt="icon" className='max-w-[40px]' />
              <div className='flex justify-between items-center'>
                <div className='flex flex-col leading-8'>
                  <span className='text-white font-[500]'>Latest News Updates</span>
                  <span className='text-[#7E7E81]'>Stay Current</span>
                </div>
                <div>
                  <ArrowRight className='bg-[#FFD11A] cursor-pointer text-black w-8 h-8 p-2 rounded-full' />
                </div>
              </div>
              <p className='text-[#7E7E81] text-sm'>Over 1,000 articles published monthly</p>
            </div>
            <div className=' w-full flex flex-col p-4 gap-5 '>
              <img src={icon2} alt="icon" className='max-w-[40px]' />
              <div className='flex justify-between items-center '>
                <div className='flex flex-col leading-8'>
                  <span className='text-white font-[500]'>Expert Contributors</span>
                  <span className='text-[#7E7E81]'>Trusted Insights</span>
                </div>
                <div>
                  <ArrowRight className='text-black bg-[#FFD11A] cursor-pointer  w-8 h-8 p-2 rounded-full' />
                </div>
              </div>
              <p className='text-[#7E7E81] text-sm'>50+ renowned AI experts on our team</p>
            </div>
            <div className=' w-full flex flex-col p-4 gap-5 '>
              <img src={icon3} alt="icon" className='max-w-[40px]' />
              <div className='flex justify-between items-center '>
                <div className='flex flex-col leading-8'>
                  <span className='text-white font-[500]'>Global Readership</span>
                  <span className='text-[#7E7E81]'>Worldwide Impact</span>
                </div>
                <div>
                  <ArrowRight className='bg-[#FFD11A] text-black cursor-pointer w-8 h-8 p-2 rounded-full' />
                </div>
              </div>
              <p className='text-[#7E7E81] text-sm'>2 million monthly readers</p>
            </div>

          </div>
          <div className='bg-[#1A1A1A] p-5'>
            <div className='flex  flex-col py-10 gap-4 sm:px-5 '>
              <span className='p-2 rounded-md w-fit bg-[#333333] text-white text-sm '>Unlock the Power of</span>
              <h3 className='text-white text-[1.5rem] sm:text-[2rem] font-[700]'>Future Tech Features</h3>
            </div>

          </div>

        </section>
        {/* section-2 */}
        <section className='py-10 md:px-[100px]  px-4p '>
          <div className='flex flex-col md:flex-row  py-10   items-center gap-5'>
            <div className=' w-full p-5  flex flex-col md:flex-row gap-20'>
              <div className=' w-full flex flex-col gap-5 p-4 '>
                <img src={icon4} alt="icon" className='max-w-[40px]' />
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col leading-10'>
                    <span className='text-white font-[500] text-[1.5rem]'>Future Technology Blog</span>
                    <span className='text-[#7E7E81]'>Stay informed with our blog section dedicated to future technology.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2  gap-5'>
              <div className='bg-[#1A1A1A] p-8 rounded-md flex flex-col gap-5'>
                <span className='text-white font-[500]'>Quantity</span>
                <p className='text-[#7E7E81] text-sm'>Over 1,000 articles on emerging tech trends and breakthroughs.</p>
              </div>
              <div className='bg-[#1A1A1A] p-8 rounded-md flex flex-col gap-5'>
                <span className='text-white font-[500]'>Variety</span>
                <p className='text-[#7E7E81] text-sm'>Articles cover fields like AI, robotics, biotechnology, and more.</p>
              </div>
              <div className='bg-[#1A1A1A] p-8 rounded-md flex flex-col gap-5'>
                <span className='text-white font-[500]'>Frequency</span>
                <p className='text-[#7E7E81] text-sm'>Fresh content added daily to keep you up to date.</p>
              </div>
              <div className='bg-[#1A1A1A] p-8 rounded-md flex flex-col gap-5'>
                <span className='text-white font-[500]'>Authoritative</span>
                <p className='text-[#7E7E81] text-sm'>Written by our team of tech experts and industry professionals.</p>
              </div>
            </div>
          </div>
          <div className='bg-[#1A1A1A] p-5'>
            <div className='flex justify-between flex-wrap items-center py-[2rem] sm:py-[4rem] gap-4 sm:px-5 '>
              <div className='flex flex-col  gap-4'>
                <span className='p-2 rounded-md w-fit bg-[#333333] text-white text-sm '>A Knowledge Treasure Trove</span>
                <h3 className='text-white text-[1.5rem] sm:text-[2rem] font-[700]'>Explore FutureTech's In-Depth Blog Posts</h3>
              </div>
              <Button className='bg-[#333333] w-full md:w-fit text-[#7E7E81] hover:text-white text-sm' >View All Blogs <ArrowRight className=' text-[#FFD11A] cursor-pointer w-8 h-8  ' /></Button>

            </div>

          </div>
          {/* show Blogs based on categories */}
          <div className=''>
            <div className='categories w-full mx-auto  flex gap-4  sm:gap-[3rem] p-10 sm:p-[3rem]   overflow-x-auto scrollbar-hide whitespace-nowrap '>
              {
                Categories.map((category) => {
                  return (
                    <button key={category} onClick={() => setSelectedCategory(category)} className={` py-3 sm:py-5 px-[4rem] ${selectedCategory === category ? 'bg-yellow-400 text-black text-sm' : 'bg-[#1A1A1A] text-white text-sm'} rounded-md `}>{category}</button>
                  )
                })
              }
            </div>
            {/* Blogs */}
            <div className='blogs'>
              {
                loading ? (
                  <div>
                    <Loader2 className='animate-spin w-8 h-8 text-white mx-auto' />
                  </div>
                ) : filterblog?.length > 0 ? (
                  (selectedCategory === "All" ? filterblog.slice(0, 3) : filterblog).map((blog) => (
                      <BlogCard key={blog._id} blogId={blog._id} name={user?.id === blog?.userId?.id ? blog?.userId?.name : blog?.userId?.name} category={blog?.category} date={new Date(blog?.createdAt).toLocaleDateString('en-US',{month: 'long', day: '2-digit', year: 'numeric'})} title={blog?.title} likes={blog?.likes.length} comments={blog?.comments.length} profilePicture={user?.id === blog?.userId?.id ? blog?.userId?.profilePicture : blog?.userId?.profilePicture || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} introduction={blog?.introduction} AddlikeAndDislike={()=>AddlikeAndDislike(blog?._id)}  />
                  ))

                ) : (
                  <p className='text-center mt-12 text-gray-500'>No blogs found</p>
                )
              }

            </div>
          </div>
        </section>
        <section className='py-5 sm:py-10 md:px-[100px] px-4 bg-[#1A1A1A]'>
            <div className='flex justify-between flex-wrap items-center py-[2rem] sm:py-[4rem] gap-4 sm:px-5 '>
              <div className='flex flex-col  gap-4'>
                <span className='p-2 rounded-md w-fit bg-[#333333] text-white text-[0.5rem] sm:text-sm '>Your Gateway to In-Depth Information</span>
                <h3 className='text-white text-[1.5rem] sm:text-[2rem] font-[700]'>Unlock Valuable Knowledge with <br /> FutureTech's Resources</h3>
              </div>
              <Button className='bg-[#333333] w-full md:w-fit text-[#7E7E81] hover:text-white text-sm' >View All Resources <ArrowRight className=' text-[#FFD11A] cursor-pointer w-8 h-8  ' /></Button>
            </div>
        </section>
           
        {/* testimonial section  */}
         <TestiMonial />
        {/* section-4 */}
        <BottomSection />
        {/* section-5 footer */}
        <Footer />

      </div>
    </div>
  );
}

export default Home;
