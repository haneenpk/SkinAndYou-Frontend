import React from 'react';
import { IoMdLogOut } from "react-icons/io";
import "@fontsource/marcellus";
import { resetDoctorState } from '../../redux/slices/doctorSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('doctorData');
    localStorage.removeItem('doctorJwtToken');
    dispatch(resetDoctorState());
    navigate("/doctor/login");
  };

  return (
    <header className="w-4/5 mx-auto bg-white text-white py-3 items-center z-20 mt-14 flex rounded-2xl">
      <img src="http://www.skinandyou.in/static/media/Logo.3245a860dcd18a15f34d.png" alt="" className='h-14 ml-2' />
      <div className='w-full'>
        <ul className='text-gray-600 flex gap-x-6 justify-end mr-3 text-base font-semibold' style={{ fontFamily: 'Marcellus, serif' }}>
          <li className='cursor-pointer hover:text-[#fe9b8e] transition-colors duration-300 mt-1'>HOME</li>
          <div>
            <IoMdLogOut
              onClick={handleLogout}
              size={32}
              className='cursor-pointer hover:text-red-600 transition-colors duration-300'
            />
          </div>
        </ul>
      </div>
    </header>
  )
}

export default Header;
