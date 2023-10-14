import React from "react";

const Status = ({ data }) => {
  return (
    <div>
     
      <div className="flex gap-[100px] py-[106px] items-center justify-center mt-[50px]">
        <div className="flex flex-col items-center">
          <label className="py-[12px] text-dark font-medium text-[24px] tracking-tight dark:text-light">Items</label>
          <span className="text-[48px]  tracking-tight font-semibold">{data.items}</span>
          <div className="h-[3px] w-[61px]" style={{ backgroundColor: "#253AD4" }}></div>
        </div>
        <div className="flex flex-col items-center">
          <label className="py-[12px] text-dark font-medium text-[24px] tracking-tight dark:text-light">Enrollments</label>
          <span className="text-[48px]  tracking-tight font-semibold">{data.enrollments}</span>
          <div className="h-[3px] w-[61px]" style={{ backgroundColor: "#6A1EAD" }}></div>
        </div>
        <div className="flex flex-col items-center">
          <label className="py-[12px] text-dark font-medium text-[24px] tracking-tight dark:text-light">Reviews</label>
          <span className="text-[48px]  tracking-tight font-semibold">{data.reviews}</span>
          <div className="h-[3px] w-[61px]" style={{ backgroundColor: "#25D42C" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Status;
