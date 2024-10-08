import React from 'react';
import { BsSearch } from "react-icons/bs";
import "@fontsource/marcellus";


function Header() {
    return (
        <header className="w-4/5 mx-auto bg-white text-white py-3 items-center z-20 mt-14 flex rounded-2xl">
            <img src="http://www.skinandyou.in/static/media/Logo.3245a860dcd18a15f34d.png" alt="" className='h-14 ml-2' />
            <div className='w-full'>
                <ul className='text-gray-600 flex gap-x-6 justify-end mr-3 text-base font-semibold' style={{ fontFamily: 'Marcellus, serif' }}>
                    <li className='cursor-pointer hover:text-[#fe9b8e] transition-colors duration-300'>HOME</li>
                    <li className='cursor-pointer hover:text-[#fe9b8e] transition-colors duration-300'>TREATMENTS</li>
                    <li className='cursor-pointer hover:text-[#fe9b8e] transition-colors duration-300'>TREATMENT BY CONCERN</li>
                    <li className='cursor-pointer hover:text-[#fe9b8e] transition-colors duration-300'>MEDIA</li>
                    <li className='cursor-pointer hover:text-[#fe9b8e] transition-colors duration-300'>ABOUT US</li>
                    <li className='flex items-center gap-2 cursor-pointer hover:text-[#fe9b8e] transition-colors duration-300'>
                        CONTACT
                        
                    </li>
                    <BsSearch size={19} className='mt-1 mr-1 cursor-pointer'/>
                </ul>
            </div>
        </header>
    )
}

export default Header;
