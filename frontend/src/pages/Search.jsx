import {
    BsStarHalf as Half,
    BsFillStarFill as Full,
    BsStar as Star,} from "react-icons/bs";
import React, { useState } from 'react';
const SearchStudent = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [result, setResult] = useState(
        [
        {
          id:1,
          roadmap: 'Frontend',
          coursesCount: 12,
          courses: [
            {
              id:1,
              title: "Learn Api basics, and learn how to integrate with the backend",
              subtitle: "Fetch api: Explore how to connect to various web APIs using JavaScript fetch. Use the returned data JSON data within you Code.",
              ratings: 4.5,
              duration: 60,
              itemsCount: 75,
              level: 'beginers',
              instructor: 'jone doe',
              topics: ['HTML', 'CSS', 'JavaScript', 'FetchApi', 'JSON', 'DOM Manipulation'],
              thumnail: "Image of the course"
            },
            {
              id:2,
              title: "Learn Api basics, and learn how to integrate with the backend",
              subtitle: "Fetch api: Explore how to connect to various web APIs using JavaScript fetch. Use the returned data JSON data within you Code.",
              ratings: 4.5,
              duration: 60,
              itemsCount: 75,
              level: 'beginers',
              instructor: 'jone doe',
              topics: ['HTML', 'CSS', 'JavaScript', 'FetchApi', 'JSON', 'DOM Manipulation'],
              thumnail: "Image of the course"
            },
            {
              id:3,
              title: "Learn Api basics, and learn how to integrate with the backend",
              subtitle: "Fetch api: Explore how to connect to various web APIs using JavaScript fetch. Use the returned data JSON data within you Code.",
              ratings: 2.5,
              duration: 60,
              itemsCount: 75,
              level: 'beginers',
              instructor: 'jone doe',
              topics: ['HTML', 'CSS', 'JavaScript', 'FetchApi', 'JSON', 'DOM Manipulation'],
              thumnail: "Image of the course"
            },
            {
              id:4,
              title: "Learn Api basics, and learn how to integrate with the backend",
              subtitle: "Fetch api: Explore how to connect to various web APIs using JavaScript fetch. Use the returned data JSON data within you Code.",
              ratings: 1.5,
              duration: 60,
              itemsCount: 75,
              level: 'beginers',
              instructor: 'jone doe',
              topics: ['HTML', 'CSS', 'JavaScript', 'FetchApi', 'JSON', 'DOM Manipulation'],
              thumnail: "Image of the course"
            },
          ]
        },
        {
          id:2,
          roadmap: 'Backend',
          coursesCount: 1,
          courses: [
            {
              id:1,
              title: "Node.js - The Complete RESTful API Masterclass (2023)",
              subtitle: "Node.js : Build fast, scalable and powerful Nodejs RESTful APIs using Express & MongoDB from Development to Deployment.",
              ratings: 4.5,
              duration: 60,
              itemsCount: 75,
              level: 'experts',
              instructor: 'jone doe',
              topics: ['REST API', 'Node JS', 'JavaScript', 'FetchApi', 'Express JS', 'MongoDB'],
              thumnail: "Image of the course"
            },
          ]
        },
      ]);

  return (
    <section className=' w-[1200px]'>
 <h1 className=' font-semibold text-[48px] tracking-tight p-[16px]'>1,000 Result for “API basics”</h1>
   <div className='  bg-secondary p-[16px] ' >

  <div  > 
    <h2 className='text-[32px] font-semibold tracking-tight'> Topics</h2>

    <div className='flex gap-[10px] py-[16px]'>
    <div className="border-[3px] border-black w-6 h-6 flex items-center justify-center">
        <input className=" w-full h-full cursor-pointer" type="checkbox" />
    </div>
         <label>Cover the basics</label>
   </div>

    
    <div className='flex gap-[10px] py-[16px]'>
    <div className="border-[3px] border-black w-6 h-6 flex items-center justify-center">
        <input className=" w-full h-full cursor-pointer" type="checkbox" />
    </div>
        <label >Advanced coverage</label>
    </div>

    <div className='flex gap-[10px] py-[16px]'>
    <div className="border-[3px] border-black w-6 h-6 flex items-center justify-center">
        <input className=" w-full h-full cursor-pointer" type="checkbox" />
    </div>
        <label >Cover additional topics</label>
    </div>
</div>
 {/*  */}
<div  className='py-[32px]'> 
    <h2 className='text-[32px] font-semibold tracking-tight'> Level</h2>

    <div className='flex gap-[10px] py-[16px]'>
    <div className="border-[3px] border-black w-6 h-6 flex items-center justify-center">
        <input className=" w-full h-full cursor-pointer" type="checkbox" />
    </div>
         <label>Beginner</label>
   </div>

    
    <div className='flex gap-[10px] py-[16px]'>
    <div className="border-[3px] border-black w-6 h-6 flex items-center justify-center">
        <input className=" w-full h-full cursor-pointer" type="checkbox" />
    </div>
        <label >Intermediate</label>
    </div>

    <div className='flex gap-[10px] py-[16px]'>
    <div className="border-[3px] border-black w-6 h-6 flex items-center justify-center">
        <input className=" w-full h-full cursor-pointer" type="checkbox" />
    </div>
        <label >Expert</label>
    </div>

    <div className="flex gap-[10px] py-4">
    <div className="border-[3px] border-black w-6 h-6 flex items-center justify-center">
        <input className=" w-full h-full cursor-pointer" type="checkbox" />
    </div>
    <label>All Levels</label>
</div>

</div>
  {/*  */}

  <div  className='py-[32px]'> 
    <h2 className='text-[32px] font-semibold tracking-tight'> Ratings</h2>

  
    <div className='  py-[16px] '>
    {result[0].courses.map(course => (
        <div className="flex gap-[10px] py-[16px] " key={course.id}>
          <div  className="border-[3px] border-black w-6 h-6 flex items-center justify-center"> 
            <input className='w-full h-full cursor-pointer  ' type="checkbox" /> 
            </div>
           <div className="flex gap-[5px]"> 
            {[...Array(Math.floor(course.ratings))].map((_, starIndex) => (
                <Full key={starIndex} className="text-yellow-500 text-[24px]" />
            ))}
            {course.ratings % 1 !== 0 && (
                <Half className="text-yellow-500 text-[24px]" />
            )}
            {[...Array(5 - Math.ceil(course.ratings))].map((_, emptyStarIndex) => (
                <Star key={emptyStarIndex} className="text-yellow-500 text-[24px]" />
            ))}
            <span className="ml-[10px] text-xl">{course.ratings} & up</span>
            </div>
        </div>
    ))}
</div>
</div>

  
 

   </div>
  
  
    </section>
  )
}

export default SearchStudent