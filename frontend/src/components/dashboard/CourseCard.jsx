import {
  BsArrowReturnLeft as ReturnLeft,
  BsStarHalf as Half,
  BsFillStarFill as Full,
  BsStar as Star,
  BsDownload as Download,
} from "react-icons/bs";
import { Button } from "../index";
const transition = "transition-colors duration-1000 ease-in-out-back";
const CourseCard = ({ image, title, subtitle, progress = -1, stars = -1 }) => {
  return progress > -1 ? (
    <div
      className={`${transition} min-w-[340px] max-w-[340px] rounded-[15px] shadow-[0_0_10px] shadow-black/25`}
    >
      <div
        className={`${transition} bg-secondary dark:bg-secondary-dark rounded-tl-[15px] rounded-tr-[15px]`}
      >
        <img src={image} className="aspect-video " alt="Course" />
      </div>
      <div
        className={`${transition} text-dark dark:text-light bg-light dark:bg-dark rounded-bl-[15px] rounded-br-[15px] p-4 text-[20px] pb-8`}
      >
        <div className="mb-16">
          <p className=" tracking-tight font-semibold mb-2">{title}</p>
          <p
            className={`${transition} text-dark/70 dark:text-light/70 font-thin`}
          >
            {subtitle}
          </p>
        </div>

        <div className="mb-8">
          <div
            className={`${transition} bg-secondary dark:bg-secondary-dark h-[10px] w-full rounded-full mb-4`}
          >
            <div
              className="bg-blue-500 h-full rounded-lg mt-[25px]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-thin tracking-tight">{progress}% Complete</p>
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
        </div>
        <Button page={"/student/roadmaps"}>
          Resume
          <ReturnLeft className="text-[20px]" />
        </Button>
      </div>
    </div>
  ) : (
    <div className="min-w-[340px] max-w-[340px] rounded-[15px] shadow-[0_0_10px] shadow-black/25">
      <div
        className={`${transition} bg-secondary dark:bg-secondary-dark rounded-tl-[15px] rounded-tr-[15px]`}
      >
        <img src={image} className="aspect-video " alt="Course" />
      </div>
      <div
        className={`${transition} text-dark dark:text-light bg-light dark:bg-dark rounded-bl-[15px] rounded-br-[15px] p-4 text-[20px] pb-8`}
      >
        <div className="mb-16">
          <p className=" tracking-tight font-semibold mb-2">{title}</p>
          <p
            className={`${transition} text-dark/70 dark:text-light/70 font-thin`}
          >
            {subtitle}
          </p>
        </div>
        <Button>
          Download Certification
          <Download className="text-[20px]" />
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
