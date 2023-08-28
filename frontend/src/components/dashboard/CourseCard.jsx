
import { BsArrowReturnLeft as ReturnLeft ,
  BsStarHalf as Half ,
  BsFillStarFill as Full ,
  BsStar as Star
 } from "react-icons/bs";


const CourseCard = ({ image, title, subtitle, progress = -1, stars = -1 }) => {



  return progress > -1 ? ( 
     <div
    
    className="flex-shrink-0 bg-secondary w-[310px] h-[480px] border border-primary rounded-lg p-4"
  >
    <div>
      <img
        src={image}
        className="w-[336px] h-[189px]"
        alt="Course"
      />
    </div>
    <p className="text-xl font-bold">{title}</p>
    <p className="text-gray-500">{subtitle}</p>
    <div className="flex items-center">
      <div className="">
        <div className="bg-gray-300 h-2 w-[270px] rounded-lg">
          <div
            className="bg-blue-500 h-2 rounded-lg mt-[25px]"
            style={{ width:`${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between my-[20px]">
      <p className="text-[20px] font-medium">
        {progress}% Complete
      </p>
      <div className="flex gap-[5px] ">
        {[...Array(Math.floor(stars))].map((_, index) => (
          <Full key={index} className="text-yellow-500 text-[24px]" />
        ))}
        {stars % 1 !== 0 && (
          <Half className="text-yellow-500 text-[24px]" />
        )}
        {[...Array(5 - Math.ceil(stars))].map((_, index) => (
          <Star key={index} className="text-yellow-500 text-[24px]" />
        ))}
      </div>
    </div>
    <div className="px-[155px] py-[16px]">
      <button className="w-[112px] h-[44px] flex justify-center bg-gradient-to-r from-[#253AD4] to-[#6A1EAD] text-white rounded-[5px] items-center">
        Resume
        <ReturnLeft className="ml-[10px] text-[20px]" />
      </button>
    </div>
  </div>
  ):   ( <div
    className="flex-shrink-0 bg-secondary w-[310px] h-[427px] border border-primary rounded-lg p-4" >
    <div>
      <img
        src={image}
        className="w-[336px] h-[189px]"
        alt="Course"
      />
    </div>
    <p className="text-xl font-bold">{title}</p>
    <p className="text-gray-500">{subtitle}</p>
    <div className="flex items-center justify-between">
      <div></div>
    </div>
    <div className="px-[46px] py-[32px]">
      <button className="w-[237px] h-[44px] flex justify-center bg-gradient-to-r from-[#253AD4] to-[#6A1EAD] text-white rounded-[5px] items-center">
        Download Certificate
        <ReturnLeft className="ml-[10px] text-[20px]" />
      </button>
    </div>
  </div>);
};

export default CourseCard;