
const ProfileCard = ({ title, number, bgColor }) => {
    return (
      <div className={`p-[14px]  rounded-[20px] w-[150px] h-[150px]p-4  ${bgColor} bg-opacity-20 flex flex-col justify-between `}>
        <h3 className="text-[12px] font-medium">{title}</h3>
        <p className="text-[48px] font-semibold  tracking-tight">{number} 
        <div class={`border-[2px]  rounded  border-primary w-[61px]`}></div>
      </p>
       
      </div>
    )
  }
  
  export default ProfileCard ;