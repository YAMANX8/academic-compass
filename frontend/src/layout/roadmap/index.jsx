import { useParams } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import { useMapContext } from "../../context/hooks/use-roadmap-context";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
const RoadmapLayout = ({ children }) => {
  useScrollToTop();
  const { topicL1Id } = useParams();
  const { roadmapName } = useMapContext();
  return (
    <main className="bg-light text-dark transition-all duration-1000 ease-in-out-back dark:bg-dark dark:text-light">
      <Header />
      <div className="m-auto w-[1200px]">
        <div className="flex justify-between">
          <h1 className="my-4 text-5xl font-semibold">
            {`${roadmapName}`.toUpperCase()}
          </h1>
          {!topicL1Id && (
            <div className="flex items-center gap-4 text-sm font-semibold">
              <span className="bg-primary p-3"></span>
              <span>Basics Level</span>
              <span className="bg-accent p-3"></span>
              <span>Intermediate Level</span>
              <span className="bg-error p-3"></span>
              <span>Advanced Level</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full bg-secondary p-4 text-center font-semibold tracking-tight text-dark transition-all duration-1000 ease-in-out-back dark:bg-secondary-dark dark:text-light">
            Beginning
          </div>
          {children}
          <div className="w-full bg-secondary p-4 text-center font-semibold tracking-tight text-dark transition-all duration-1000 ease-in-out-back dark:bg-secondary-dark dark:text-light">
            End
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default RoadmapLayout;
