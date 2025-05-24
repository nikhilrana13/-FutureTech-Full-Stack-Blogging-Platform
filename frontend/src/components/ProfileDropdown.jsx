import { LogOutIcon, PlusIcon, PowerOff, User2Icon, UserCircle2Icon, View, ViewIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ViewEachUserBlogs from './ViewEachUserBlogs';
import { Button } from './ui/button';
import GetUserProfile from './GetUserProfile';
import UpdateProfileUser from './UpdateProfileUser';

const ProfileDropdown = ({Logout}) => {
  const user = useSelector((state) => state.Auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-max mx-auto">
      <button
        type="button"
        ref={buttonRef}
        onClick={toggleDropdown}
        className="px-4 py-2 flex items-center rounded-full  text-sm font-medium border border-slate-300 outline-none hover:bg-slate-200 hover:text-slate-900 text-white"

      >
        <img
          src={user?.profilePicture || 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80'}
          className="w-7 h-7 mr-3 rounded-full shrink-0"
          alt="Profile"
        />
        <span className='hidden sm:inline'>{user?.name.slice(0,6) + ' '+ user?.name.slice(6) || 'User'} </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 fill-slate-400 inline ml-3"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
          />
        </svg>
   
      </button>

      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto"
        >
          <li
            className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-200 text-slate-900 text-sm cursor-pointer"
          >
            <GetUserProfile />
          </li>
           <li
             onClick={(()=>{setIsDialogOpen2(true) ;closeDropdown()})}
            className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-200 text-slate-900 text-sm cursor-pointer"
          >
            <UserCircle2Icon className="w-4 h-4 mr-3" />
            Update Profile
            <UpdateProfileUser />
          </li>
          <NavLink to="/addblog">
          <li
            onClick={closeDropdown}
            className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-200 text-slate-900 text-sm cursor-pointer"
          >
            <PlusIcon className="w-4 h-4 mr-3" />
            Add Blog
          </li>
          </NavLink>

          <li onClick={()=>{setIsDialogOpen(true);closeDropdown()}}   className='dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-200 text-slate-900 text-sm cursor-pointer'>
            <ViewIcon className="w-4 h-4 mr-3" />
             View All Blogs
            <ViewEachUserBlogs  />
          </li>
         
          <li
            onClick={Logout}
            className="dropdown-item py-2.5 px-5 flex items-center hover:bg-slate-200 text-slate-900 text-sm cursor-pointer"
          >
            <LogOutIcon className="w-4 h-4 mr-3" />
            Logout
          </li>
        </ul>

      )}
       <ViewEachUserBlogs open={isDialogOpen} setOpen={setIsDialogOpen} />
       <UpdateProfileUser open={isDialogOpen2} setOpen={setIsDialogOpen2} />

    </div>
  );
};

export default ProfileDropdown;
