import { useParams } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import { useMapContext } from "../../context/hooks/use-roadmap-context";
const RoadmapLayout = ({ children }) => {
  const { topicL1Id } = useParams();
  const { roadmapName } = useMapContext();
  return (
    <main className="bg-light dark:bg-dark text-dark dark:text-light transition-all duration-1000 ease-in-out-back">
      <Header />
      <div className="w-[1200px] m-auto">
        <div className="flex justify-between">
          <h1 className="mb-4 font-bold text-[48px] tracking-tight">
            {`${roadmapName}`.toUpperCase()}
          </h1>
          {!topicL1Id && (
            <div className="flex gap-4 text-sm font-semibold items-center">
              <span className="bg-primary p-3"></span>
              <span>Basics Level</span>
              <span className="bg-accent p-3"></span>
              <span>Intermediate Level</span>
              <span className="bg-advance p-3"></span>
              <span>Advanced Level</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full p-4 text-dark dark:text-light bg-secondary dark:bg-secondary-dark font-semibold tracking-tight text-center transition-all duration-1000 ease-in-out-back">
            Beginning
          </div>
          {children}
          <div className="w-full p-4 text-dark dark:text-light bg-secondary dark:bg-secondary-dark font-semibold tracking-tight text-center transition-all duration-1000 ease-in-out-back">
            End
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default RoadmapLayout;
