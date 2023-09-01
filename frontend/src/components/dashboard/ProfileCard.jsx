const ProfileCard = ({ title, number, bgColor }) => {
  return (
    <div
      className={`rounded-[20px] w-[155px] aspect-square p-4  ${bgColor} bg-opacity-20 flex flex-col justify-between `}
    >
      <h3 className="text-[12px] font-medium tracking-tight">{title}</h3>
      <p className="text-[48px] font-semibold  tracking-tight">
        {number}
        <div className={`h-[3px]  rounded ${bgColor} w-[61px]`}></div>
      </p>
    </div>
  );
};

export default ProfileCard;
