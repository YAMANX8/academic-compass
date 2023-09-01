import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosInformationCircleOutline as InformationIcon } from 'react-icons/io';
import { MdOutlineSecurity as Security } from 'react-icons/md';
import { BsPerson as Person } from 'react-icons/bs';

import {General} from '../components/index';

function Setting_Student() {
  const [selectedLink, setSelectedLink] = useState('general'); 

  return (
    <div>
      <h2 className=' py-[16px] font-semibold text-[48px] leading-[125.5%] tracking-tight text-[var(--text, #070B27)]'>
        Setting  </h2>
      
      <div className='bg-secondary flex'>
      <ul>
            <li className='p-[32px] whitespace-nowrap'>
                <Link 
                    className={`p-[16px] w-[305px] space-x-2 flex rounded-[10px] ${selectedLink === 'general' ? 'bg-[var(--primary,#253AD4)] text-white' : 'hover:bg-blue-500 active:bg-blue-700 text-black'}`}
                    onClick={() => setSelectedLink('general')}
                >
                    <InformationIcon className='text-3xl transform scale-125' />
                    <span className='text-[24px] font-medium'>General Information</span>
                </Link>
            </li>

            <li className='p-[32px]'>
                <Link 
                    className={`p-[16px] w-[305px] space-x-2 flex rounded-[10px] ${selectedLink === 'security' ? 'bg-[var(--primary,#253AD4)] text-white' : 'hover:bg-blue-500 active:bg-blue-700 text-black'}`}
                    onClick={() => setSelectedLink('security')}
                >
                    <Security className='text-3xl transform scale-125' />
                    <span className='text-[24px] font-medium'>Security</span>
                </Link>
            </li>

            <li className='p-[32px]'>
                <Link 
                    className={`p-[16px] w-[305px] space-x-2 flex rounded-[10px] ${selectedLink === 'account' ? 'bg-[var(--primary,#253AD4)] text-white' : 'hover:bg-blue-500 active:bg-blue-700 text-black'}`}
                    onClick={() => setSelectedLink('account')}
                >
                    <Person className='text-3xl transform scale-125' />
                    <span className='text-[24px] font-medium'>Account</span>
                </Link>
            </li>
        </ul>

        {/* line */}
          <div className='border-l border-r border-gray-300 mx-4 my-[50px]'></div>
            

         <General/>

      
       
          
      </div>

       
 

    </div>
  );
}

export default Setting_Student;