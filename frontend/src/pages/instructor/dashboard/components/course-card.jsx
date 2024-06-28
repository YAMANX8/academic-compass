import Image from "../../../../assets/images/Rectangle 63.png";
import { Button, Progress } from "../../../../components";
import { Icon } from "@iconify/react";
import { paths } from "../../../../routes/paths";

const CourseCard = ({
  id,
  title,
  subtitle,
  image = Image,
  type,
  active = true,
  progress,
}) => {
  return (
    <div className="flex w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300">
      <div className="w-80 overflow-hidden">
        <img
          src={image}
          alt=""
          className="aspect-video h-auto w-full object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="line-clamp-1 text-xl font-medium">{title}</h3>
          <p className="mt-1 line-clamp-2">{subtitle}</p>
        </div>
        {type ? (
          <div className="flex items-center justify-between">
            <p className="font-medium">
              Course Status:{" "}
              <span className={active ? "text-accent" : "text-error"}>
                {active ? "Active" : "Inactive"}
              </span>
            </p>
            <div className="flex gap-2">
              <Button page={`${paths.course.manage.monitor}/${id}`}>
                <Icon icon="mdi:eye" />
                View Details
              </Button>
              <Button
                page={`${paths.course.root}/${id}/${paths.course.manage.curriculum}`}
              >
                <Icon icon="mdi:pencil" />
                Course Management
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <div className="flex-grow">
              <p className="mb-2">
                Progress:{" "}
                <span
                  className={
                    (progress / 11) * 100 <= 40
                      ? "text-error"
                      : (progress / 11) * 100 <= 70
                        ? "text-warning"
                        : "text-success"
                  }
                >
                  {progress}
                </span>{" "}
                of <span className="text-primary">11</span>
              </p>
              <Progress percentage={(progress / 11) * 100} />
            </div>

            <Button
              page={`${paths.course.root}/${id}/${paths.course.manage.curriculum}`}
            >
              <Icon icon="mdi:pencil" /> Continue Editing
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
