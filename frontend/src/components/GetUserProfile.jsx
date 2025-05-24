import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogHeader
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User2Icon } from 'lucide-react';
import { useSelector } from 'react-redux';

const GetUserProfile = () => {
    const user = useSelector((state)=>state.Auth.user);
    // console.log("user",user);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='flex items-center' variant="outline"> <User2Icon className="w-4 h-4 mr-3" />View profile</button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
           <DialogHeader>
          <DialogTitle>Your profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" >
              Name
            </Label>
            <Input id="name" value={user?.name} disabled className="col-span-3 bg-gray-900 text-white" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" >
              Email
            </Label>
            <Input id="email" value={user?.email} disabled className="col-span-3 bg-gray-900 text-white" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GetUserProfile;
