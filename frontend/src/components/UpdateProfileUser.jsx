
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {  UserCircleIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SetUser } from '@/redux/AuthSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SetBlogs } from '@/redux/BlogsSlice';

const UpdateProfileUser = ({open,setOpen}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const user = useSelector((state)=>state.Auth.user);
    // console.log("user",user);
    const [input,setInput] = useState({})

    useEffect(()=>{
        if(user){
            setInput({
                name:user.name,
                email:user.email,
                profilePicture:""
            })
        }
    },[user])
    const handleInputChange =(e)=>{
        // setInput({...input,[e.target.name]:e.target.value})
        const {name,value,files} = e.target;
        if(name === "profilePicture"){
            setInput((prev)=>({...prev,profilePicture:files[0]}))
        }else{
            setInput((prev)=>({...prev,[name]:value}))
        }
    }

     //    console.log("input",input);
     // updating user info
 

     const OnSubmit = async(input)=>{
        const formdata = new FormData();
          formdata.append("name",input.name);
          formdata.append("email",input.email);
          if(input.profilePicture){
            formdata.append("profilePicture",input.profilePicture);
          }
          try {
            setLoading(true);
            const response = await axios.patch("http://localhost:3000/api/user/updateprofile",formdata,{
                headers:{"Content-Type":"multipart/form-data"},
                withCredentials:true
            });
            if(response.data){
                const updateUser = response.data?.updateUser
                toast.success(response?.data?.message || "Profile updated successfully");
                dispatch(SetUser(response?.data?.updateUser))
                dispatch(SetBlogs((prevblogs)=>{
                    return prevblogs.map((blog)=>{
                        if(blog.userId._id === updateUser._id){
                            return {...blog,userId:{...blog.userId,name:updateUser.name,email:updateUser.email,profilePicture:updateUser.profilePicture}}
                        }
                        return {...blog};
                    })
                }))
           }
          } catch (error) {
            toast.error(error.response?.data?.message || "Profile update failed");
          }finally{
            setTimeout(() => {
                setLoading(false);
            },1000);
          }
        }

  
   


 return (
      <Dialog open={open} onOpenChange={setOpen}  >
            <DialogContent className="sm:max-w-[455px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form  onSubmit={(e)=>{e.preventDefault();OnSubmit(input)}} >
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="name">
                            Name
                        </Label>
                        <Input type="text" id="name" name="name" value={input.name}  onChange={handleInputChange} className="col-span-3" />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="email">
                            Email
                        </Label>
                        <Input type="email" id="email" name="email" value={input.email} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="profilePicture" >
                            Profile Picture
                        </Label>
                        <Input type="file" accept="image/*" name="profilePicture" onChange={handleInputChange} id="profilePicture"   className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit"> {loading ? "Updating...": "Update" }</Button>
                </DialogFooter>
                </form>
               
            </DialogContent>
        </Dialog>
  );
}

export default UpdateProfileUser;
