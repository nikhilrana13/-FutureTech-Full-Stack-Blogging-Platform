import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetBlogs } from '@/redux/BlogsSlice';

const EditBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [Blog,setBlog] = useState([]);
    const [Blogimg,setBlogimg] = useState([]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const {id} = useParams();

    
    


    //fetch Blog detail
    useEffect(()=>{
          const FetchBlogdetails= async()=>{
            try {
                const response = await axios.get(`http://localhost:3000/api/blog/${id}`,{withCredentials:true});
                // console.log("response",response);
                if(response.data){
                    setBlog(response.data.blog)
                    setBlogimg(response.data.blog.image)
                    setValue("title",response.data.blog.title);
                    setValue("introduction",response.data.blog.introduction);
                    setValue("author",response.data.blog.author);
                    setValue("category",response.data.blog.category);
                    setValue("tableofcontent",response.data.blog.tableofcontent);
                    setValue("content",response.data.blog.content);
                }
            } catch (error) {
                console.log("failed to fetch blog details",error);
            }
          }
          FetchBlogdetails();
    },[id,setValue])

    const onSubmit = async(data) => {
        const formdata = new FormData();
            formdata.append("title",data.title);
            formdata.append("introduction",data.introduction);
            formdata.append("author",data.author);
            formdata.append("category",data.category);
            formdata.append("tableofcontent",data.tableofcontent);
            formdata.append("content",data.content);
            
            // check if image is selected
            if(data.image.length > 0 ){
                formdata.append("image",data.image[0]);
            }
            try {
                setLoading(true);
                const response = await axios.put(`http://localhost:3000/api/blog/update/${id}`,formdata,{headers:{"Content-Type":"multipart/form-data"},withCredentials:true});
                if(response.data){
                    toast.success(response?.data?.message || "Blog Updated successfully");
                    dispatch(SetBlogs(response?.data?.updatedBlog));
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);

                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Blog Update failed");
            }finally{
                setTimeout(() => {
                   setLoading(false); 
                },2000);
            }
    };

 
  return (
        <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6 text-white">Update Blog</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
                    {/* Blog Title */}
                    <div className=''>
                        <label className="block text-sm font-medium text-white mb-2">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter blog title"
                            {...register('title', { required: "Title is required" })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                    </div>
    
                    {/* Author Name */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Author Name
                        </label>
                        <input
    
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter author name"
                            {...register('author', { required: "Author name is required" })}
                        />
                        {errors.author && (
                            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
                        )}
                    </div>
    
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Category
                        </label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('category', { required: "Category is required" })}
                        >
                            <option value="">Select a category</option>
                            <option value="Technology">Technology</option>
                            <option value="Health">Health</option>
                            <option value="Politics">Politics</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Education">Education</option>
                            <option value="Sports">Sports</option>
                            <option value="Web Development">Web Development</option>
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                        )}
                    </div>
    
                    {/* Blog Image */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Blog Image
                        </label>
                        
                        <div className="flex gap-2">
                            <label htmlFor="image">
                                <span className='text-white'>Previous Image click to change</span>
                                {Blogimg && (
                                    <img src={Blogimg} className="w-20 h-20 mt-2 cursor-pointer rounded-xl" alt="Upload Image" />
                                )}
                                <input 
                                    accept='image/*'
                                    type="file" 
                                    id="image" 
                                    name='image'
                                    onChange={(e)=>{const file = e.target.files[0];setValue("image",file);}}
                                    hidden 
                                    {...register('image')}
                                />
                                
                            </label>
                        </div>
                       
                    </div>
    
                    {/* Introduction */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Introduction
                        </label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            placeholder="Write a brief introduction"
                            {...register('introduction', { required: "Introduction is required" })}
                        ></textarea>
                        {errors.introduction && (
                            <p className="text-red-500 text-sm mt-1">{errors.introduction.message}</p>
                        )}
                    </div>
    
                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Blog Content
                        </label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="8"
                            placeholder="Write your blog content"
                            {...register('content', { required: "Content is required" })}
                        ></textarea>
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                        )}
                       
                      
                    </div>
                    {/* table of content */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Table of Content
                        </label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="8"
                            placeholder="Write your blog table of content"
                            {...register('tableofcontent', { required: "Content is required" })}
                        ></textarea>
                        {errors.tableofcontent && (
                            <p className="text-red-500 text-sm mt-1">{errors.tableofcontent.message}</p>
                        )}
                       
                      
                    </div>
    
                    {/* Submit Button */}
                    <Button 
                        type="submit" 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white md:w-auto px-6 py-2"
                    >
                        {loading ? "Updating..." : "Update"}
                        
                    </Button>
    
                </form>
            </div>
  );
}

export default EditBlog;
