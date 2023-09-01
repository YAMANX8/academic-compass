import React from 'react'
import { LiaSaveSolid as Solid } from 'react-icons/lia';
import {BsCloudUpload as Upload} from "react-icons/bs"

import Profile from "../../assets/images/frontend.svg";
import { Button } from '../index';
function General() {

    const firstName = "Jone";
  const lastName = "Doe";
  const location = "Damascus, Syria";
  const images = { Profile };

  return (
    <div > 
    <h3 className='p-[32px]  text-[32px] tracking-tight font-semibold  '>General Information</h3>
    
    <p className='p-[32px]  text-[22px] tracking-tight font-semibold'> Profile Picture Upload </p>
  
    <div className="flex  p-[32px] ">
     <img className="w-[162px]  " src={images.Profile}/>
     <div className='  px-[32px] '>
     <p className='  font-medium text-[20px] tracking-tight'>{firstName} {lastName}</p>
      <p className=" py-[16px] text-[16px]  tracking-tight text-primary">{location}</p>
       <div className='py-[32px]'>
       <Button >
           Upload New Photo <Upload className='text-[25px]'/>
           </Button>
       </div>
       </div>
       </div>

       <h3 className='px-[32px] py-[16px] font-semibold text-[22px] tracking-tight leading-l'> Address</h3>
       <div className='flex gap-[27px] px-[32px]'> 
        <div className=' grid  pb-[108px] gap-[10px] '> 
        <span className=' font-medium text-[22px] leading-l' >Country </span>
        <input className=' w-[370px] p-[10px] rounded-[5px] bg-secondary  border border-dark/50' type="text" placeholder='Syria' />
        </div>
        <div className=' grid pb-[108px] gap-[10px] '> 
       <span  className=' font-medium text-[22px] leading-l'> City </span>
        <input className='w-[370px] p-[10px] rounded-[5px]   border border-dark/50 bg-secondary ' type="text" placeholder='Damascus' />
       
        </div>
       
        <div className=' mt-[120px] ml-[-190px]'>
        <Button >
       Save Changes <Solid className='text-[25px]'/>
       </Button>
        </div> 
       </div> 
   </div>
  )
}

export default General;