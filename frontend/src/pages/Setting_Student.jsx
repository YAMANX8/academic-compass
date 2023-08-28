import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosInformationCircleOutline as InformationIcon } from 'react-icons/io';
import { MdOutlineSecurity as Security } from 'react-icons/md';
import { BsPerson as Person } from 'react-icons/bs';

function Setting_Student() {
  return (
    <div  >
       
      <h2 className=' py-[16px] font-semibold text-[48px] leading-[125.5%] tracking-tight text-[var(--text, #070B27)]'>
        Setting  </h2>
      

        
      <div className='w-[1200px] h-[593px] bg-secondary flex'>
          <ul className=''>
          <li className=' py-[36px] px-[40px]  whitespace-nowrap    text-light '>
         <Link className='px-[60px] py-[16px] w-[305px]    space-x-2 flex rounded-[10px]  rounded-10 bg-[var(--primary,#253AD4)]'>
          <InformationIcon className=' text-3xl transform scale-125  ' />
           <span className='font-medium '>General Information</span>
             </Link>
             </li>

             <li className='  py-[50px] px-[40px] text-[var(--text,#070B27)]  '>
         <Link className=' space-x-2 flex rounded-[10px] px-[60px] py-[16px] w-[305px] rounded-10'>
          <Security className=' text-3xl transform scale-125 ' />
           <span className=' text-[24px]  font-medium  leading-normal tracking-[0.72px] '>Security</span>
             </Link>
             </li>

             <li className=' px-[40px] text-[var(--text,#070B27)'>
         <Link className=' space-x-2 flex rounded-[10px] px-[60px] py-[16px] w-[305px] rounded-10 '>
          <Person className=' text-3xl transform scale-125 ' />
           <span className=' ] text-[24px]   font-medium  leading-normal tracking-[0.72px]'>Account</span>
             </Link>
             </li>
          </ul>
   
          <div className='border-l border-r border-gray-300 mx-4 my-[50px]'></div> 

<div className=''>   </div>
   
      </div>

   
      
 

    </div>
  );
}

export default Setting_Student;