import { AiOutlineEnter as Enter } from "react-icons/ai";
import { Button } from "../index";
import { paths } from "../../routes/paths";

const RoadmapCard = ({ id, title, order, description, img }) => {
  return (
    <div
      className={`flex justify-between aspect-[200/63] bg-secondary dark:bg-secondary-dark transition-all duration-1000 ease-in-out-back text-dark dark:text-light rounded-[10px] py-4 px-5 gap-5 overflow-hidden ${
        order % 2 != 0 ? "flex-row-reverse" : "flex-row"
      }  shadow-[0_5px_15px] shadow-black/50`}
    >
      <div className=" min-w-[380px] flex justify-center">
        <img src={img} className="" />
      </div>

      <div className="flex flex-col gap-4 flex-1 ">
        <h3 className="text-[48px] font-bold leading-l tracking-tight text-accent dark:text-accent-dark transition-all duration-1000 ease-in-out-back">
          {title}
        </h3>
        <p className="text-[28px] leading-l tracking-tight overflow-auto">
          {description} Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Corporis tempore aspernatur assumenda, distinctio vitae ipsam at
          ducimus voluptatem voluptatum tenetur eligendi, quae possimus
          quibusdam eaque. Labore adipisci exercitationem officia iure?
        </p>
        <div className="mt-auto">
          <Button page={`${paths.roadmaps}/${id}`}>
            Discover <Enter />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;
