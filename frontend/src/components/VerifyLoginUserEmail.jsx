
import { SetUser } from '@/redux/AuthSlice';
import axios from 'axios';
import React, { useRef , useState} from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const VerifyLoginUserEmail = () => {
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch()
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]
  const navigate = useNavigate();
    const { register, handleSubmit,  formState: { errors } } = useForm();

    // handle auto focus to next input
    const handleChange = (e,index)=>{
      const value = e.target.value;
      if(value.length === 1 && index < inputRefs.length - 1){
        inputRefs[index + 1].current.focus();  // move focus to next input
      }
      if(value.length === 0 && index > 0){
        inputRefs[index - 1].current.focus();  // move focus to previous input
      }
    }

    const onSubmit = async(data)=>{
        // console.log("form submit")
         const otp = {
             code:Object.values(data).join(""),
          
         }
        //  console.log("form submit",otp);
      try {
           setLoading(true);
           const response = await axios.post("http://localhost:3000/api/user/verifylogin",otp,{withCredentials:true});
            // console.log("response",response);
           if(response.data){
             toast.success(response?.data?.message || "Email verified successfully");
             dispatch(SetUser(response?.data?.user))
             navigate("/");
           }
      } catch (error) {
         toast.error(error.response?.data?.message || "Email verification failed");
        
      }finally{
        setTimeout(() => {
          setLoading(false);
        },500);
      }
    }
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-12">
    <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
      <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="font-semibold text-3xl">
            <p>Email Verification</p>
          </div>
          <div className="flex flex-row text-sm font-medium text-gray-400">
            <p>We have sent a code to your email</p>
          </div>
        </div>
        <div>
          <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-16">
              <div className="flex flex-row items-center gap-5 justify-between mx-auto w-full max-w-md">
                {/* otp inputs */}
                {
                  Array.from({length:6}).map((_,index)=>{
                    return (
                      <div key={index} className="w-16 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        {...register(`code${index + 1}`, { required: true,maxLength: 1 })}
                        maxLength={1}
                        ref={(el) => {
                          inputRefs[index].current = el // for manual focus
                          register(`code${index + 1}`).ref(el) // for react-hook-form
                        }}
                        onChange={(e)=>handleChange(e,index)}
                      />
                    </div>
                    )
                
                  })
                }
            
              </div>
              {Object.keys(errors).length > 0 && (
                  <p className="text-red-500 text-center text-sm">All fields are required</p>
                )}
              <div className="flex flex-col space-y-5">
                <div>
                  <button type="submit" className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none hover:bg-blue-800 text-white text-sm shadow-sm">
                    {
                      loading ? "please wait..." : "Verify Email"
                    }
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

export default VerifyLoginUserEmail;
