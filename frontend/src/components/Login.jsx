import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const { register, handleSubmit,  formState: { errors } } = useForm();


  const onSubmit = async(data) => {
      const info = {
        email:data.email
      }
      try {
      setLoading(true);
        const response = await axios.post("http://localhost:3000/api/user/login",info,{withCredentials:true});
        if(response.data){
          toast.success(response?.data?.message || "Login successful");
          navigate("/verifylogin");
        } 
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      }finally{
        setTimeout(() => {
          setLoading(false);
        },1000);
      }
  };
  return (
    <div className="flex flex-col justify-center sm:h-screen p-4 ">
  <div className="max-w-md w-full mx-auto border border-slate-300 rounded-2xl p-8">
    <div className="text-center mb-12">
       <span className='text-white text-2xl font-[700]'>Login with Email</span>
    </div>
    <form className='' onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <label className="text-[#fff] text-sm font-medium mb-2 block">
            Email
          </label>
          <input
            name="email"
            type="email"
            className=" bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md"
            placeholder="Enter email"
            required
            {...register("email", { required: true })}
          />
        </div>
       
        </div> 
        <div className='mt-12 '>
        <div>
        <button
          type="submit"
          className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "please wait..." : "Login"}
        </button>
      </div>
      <p className="text-gray-500  text-sm mt-6 text-center">
        Don't have an account ?
        <NavLink
          to="/signup"
          className="text-blue-600 font-medium "
        >
          Sign Up 
        </NavLink>
      </p>

        </div>
    
    </form>
  </div>
</div>
  );
}

export default Login;
