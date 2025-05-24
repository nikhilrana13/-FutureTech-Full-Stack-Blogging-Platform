import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Edit, Loader2 } from 'lucide-react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ViewEachUserBlogs = ({open,setOpen}) => {
    const [ViewBlogs, setViewBlogs] = useState([]);
    //  console.log("ViewBlogs",ViewBlogs);
    const [loading, setLoading] = useState(false);
 
    // fetch user blogs
    useEffect(() => {
        const FetchUserAllblogs = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3000/api/blog/userblogs", { withCredentials: true });
                // console.log("response", response);
                if (response.data) {
                    setViewBlogs(response.data.blog)
                }

            } catch (error) {
                console.log("failed to fetch all blogs", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        }
        FetchUserAllblogs();
    }, [])

    
    // handle delete blog
    const handleDeleteBlog = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/blog/delete/${id}`,{withCredentials:true});
            if(response.data){
                toast.success(response?.data?.message || "Blog Deleted successfully");
                setViewBlogs(prev=>prev.filter(blog=>blog._id !== id));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Blog Delete failed");
            
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="sm:max-w-[85vw]">
                
                <form  >
                    <div>
                        <div>
                            <p className='text-start font-[500] text-black'>All Blogs list</p>
                            <div className='hidden md:grid grid-cols-[3fr_1fr_1fr_1fr_1fr] mt-4 items-center py-1 px-2 border bg-gray-100 text-sm'>
                                <b>Title</b>
                                <b>Upload Date</b>
                                <b>Category</b>
                                <b className=''>Edit</b>
                                <b className='text-right border md:text-center'>Delete</b>
                            </div>
                            {
                                loading ? (
                                    <Loader2 className='animate-spin mt-5 text-center  mx-auto' />
                                ) : ViewBlogs?.length > 0 ? (
                                    ViewBlogs?.map((Blog, index) => {
                                        return (
                                            <div key={index} className='grid grid-cols-[3fr_1fr_1fr_1fr_1fr] min-h-[70px] md:grid-cols-[3fr_1fr_1fr_1fr_1fr] mt-2 items-center py-1 px-2 border'>
                                                <p className='truncate'>{Blog?.title}</p>
                                                <p className='truncate'>{new Date(Blog?.createdAt).toLocaleDateString('en-GB')}</p>
                                                <p className='hidden md:inline'>{Blog?.category}</p>
                                                <NavLink to={`/editblog/${Blog?._id}`}>
                                                <p className='cursor-pointer'><Edit /></p>
                                                </NavLink>
                                               
                                                <p onClick={()=>handleDeleteBlog(Blog?._id)} className='cursor-pointer text-right md:text-center text-lg'>X</p>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p className='text-center mt-12 text-gray-500'>No blogs found</p>
                                )
                            }



                        </div>

                    </div>



                </form>

            </DialogContent>
        </Dialog>
    );
}

export default ViewEachUserBlogs;
