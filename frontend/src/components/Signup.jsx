import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit,  formState: { errors } } = useForm();

  // handle form submission
    const onSubmit = async(data)=>{
        const userinfo = {
            name:data.name,
            email:data.email,
        }
         try {
          setLoading(true);
           const response = await axios.post("http://localhost:3000/api/user/register",userinfo,{withCredentials:true});
           if(response.data){
              toast.success(response?.data?.message || "Signup successful");
              navigate("/verifyemail");
           }
         } catch (error) {
          console.log("failed to sign up",error);
           toast.error(error.response?.data?.message || "Signup failed");
         }finally{
           setTimeout(() => {
            setLoading(false);
           },1000);
         }
        }
  

  return (
<div className="flex flex-col justify-center sm:h-screen p-4 ">
  <div className="max-w-md w-full mx-auto border border-slate-300 rounded-2xl p-8">
    <div className="text-center mb-12">
       <span className='text-white text-2xl font-[700]'>Sign up with Email</span>
    </div>
    <form className='' onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
      <div>
          <label className="text-[#fff] text-sm font-medium mb-2 block">
            Name
          </label>
          <input
            name="name"
            type="text"
            className=" bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md "
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
        </div>
        {errors.name && <span className='text-red-500'>Name is required</span>}
        <div>
          <label className="text-[#fff] text-sm font-medium mb-2 block">
            Email
          </label>
          <input
            name="email"
            type="email"
            className=" bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md"
            placeholder="Enter email"
            {...register("email", { required: true })}
          />
        </div>
        {errors.email && <span className='text-red-500'>Email is required</span>}
        </div> 
        
      <div className="mt-12">
     
           <button
            type="submit"
            className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {
              loading ? "please wait..." : "Create a account"
            }
          </button>
      
          
        
      
      </div>
      <p className="text-gray-500 text-sm mt-6 text-center">
        Already have an account?{" "}
        <NavLink
          to="/login"
          className="text-blue-600 font-medium "
        >
          Login here
        </NavLink>
      </p>
    </form>
  </div>
</div>

  );
}

export default Signup;
