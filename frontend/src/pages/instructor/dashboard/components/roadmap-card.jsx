import { Button } from "../../../../components";
import { paths } from "../../../../routes/paths";
import Image from "../../../../assets/images/frontend.svg";

const RoadmapCard = ({
  roadmapTitle = "frontend",
  roadmapId = 18,
  image = Image,
}) => {
  return (
    <div className="flex gap-4 rounded border-2 border-dashed border-gray-300 p-2">
      <div className="w-[240px] overflow-hidden">
        <img
          src={image}
          alt={`Image of ${roadmapTitle} roadmap`}
          className="aspect-video h-auto w-full object-contain"
        />
      </div>
      <div className="flex flex-grow flex-col justify-between">
        <p className="text-xl font-medium capitalize">{roadmapTitle} roadmap</p>
        <Button
          size="sm"
          className="self-end"
          page={`${paths.roadmaps}/${roadmapId}`}
        >
          Enter
        </Button>
      </div>
    </div>
  );
};

export default RoadmapCard;
