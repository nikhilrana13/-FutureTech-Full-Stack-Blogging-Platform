import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserIcon } from 'lucide-react';
import logo from "../assets/logo.png";
import { useSelector } from 'react-redux';
import ProfileDropdown from './ProfileDropdown';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetUser } from '@/redux/AuthSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user)
  // console.log("user",user);
    const [toggle,setToggle] = useState(false);

    const handleToggle= ()=>{
        setToggle(!toggle);
    }

    // handle Logout //
     const Logout = async ()=>{
        try {
           const response = await axios.get("http://localhost:3000/api/user/logout",{withCredentials:true});
           if(response.data){
             toast.success(response?.data?.message || "Logout successful");
             dispatch(SetUser(null))
             setTimeout(() => {
              navigate("/")
             }, 100);

           }
          
        } catch (error) {
           toast.error(error.response?.data?.message || "Logout failed");
        }
     }
  return (
    <header className="flex bg-[#1A1A1A] items-center py-3 sm:px-6 px-4 font-[sans-serif] min-h-[75px] tracking-wide relative z-50">
    <div className="flex max-w-screen-xl p-3 mx-auto w-full">
      <div className="flex flex-wrap items-center justify-between lg:gap-y-2 gap-2 w-full">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} className="w-10 h-10" alt="logo" />
           <span className="text-[0.85rem] sm:text-2xl  text-white  font-bold" >FutureTech</span>
        </NavLink>

        {/* Mobile Menu */}
        <div
          className={`lg:ml-6 lg:!block  max-lg:fixed gap-8 max-lg:bg-black max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 transition-transform duration-300 ${
            toggle ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
          }`}
        >
         
         
          {/* Close Button */}
          <button onClick={handleToggle} className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
            </svg>
          </button>

          {/* Menu Items */}
          <ul className="lg:flex items-center w-full lg:mt-0 mt-10 gap-6  cursor-pointer sm:gap-8 max-lg:space-y-3">
            <li className="max-lg:border-b ">
              <NavLink to="/"  className={({isActive})=>isActive ? "text-white text-sm block font-[600]":"text-[#7E7E81] text-sm block font-[600]"}>
                <p>HOME</p>
              </NavLink>
            </li>
            <li className="max-lg:border-b ">
              <NavLink to="/news"className={({isActive})=>isActive ? "text-white text-sm block font-[600]":"text-[#7E7E81] text-sm block font-[600]"} >
                <p>NEWS</p>
              </NavLink>
            </li>
            <li className="max-lg:border-b  ">
              <NavLink to="/contact" className={({isActive})=>isActive ? "text-white text-sm block font-[600]":"text-[#7E7E81] text-sm block font-[600]"}>
                <p>CONTACT</p>
              </NavLink>
            </li>
             
          
          </ul>
        </div>

        {/* Cart & Menu Toggle */}
        <div className="flex items-center gap-x-5 gap-y-3 ">
          <div className="flex items-center gap-3">
            {
              user ? <ProfileDropdown Logout={Logout} /> : <>
               <div>         
                    <NavLink to="/login">
                    <button type="button" class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Login</button>
                            </NavLink>
                  </div>
              </>
            }
                   
                

            {/* Mobile Menu Button */}
            <button onClick={handleToggle} className="lg:hidden">
              <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  );
}

export default Navbar;
