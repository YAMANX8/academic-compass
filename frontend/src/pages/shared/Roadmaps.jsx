import { useEffect } from "react";
import { RoadmapCard } from "../../components/index.js";
import { Helmet } from "react-helmet-async";
import { useMapContext } from "../../context/hooks/use-roadmap-context.js";
// ________________________________________________________________________
function Roadmaps() {
  const { getAllRoadmaps, roadmaps } = useMapContext();
  useEffect(() => {
    getAllRoadmaps();
  }, []);

  return (
    <>
      <Helmet>
        <title>Academic Compass: Roadmaps</title>
      </Helmet>
      <section className="w-[1200px]">
        <h2 className="mb-12 text-[48px] font-semibold leading-l tracking-tight">
          Our Roadmaps
        </h2>
        <div className="flex flex-col gap-12">
          {roadmaps.length > 0 ? (
            roadmaps.map((card, index) => (
              <RoadmapCard
                key={card.roadmap_id}
                id={card.roadmap_id}
                order={index}
                title={card.roadmap_title}
                description={card.roadmap_description}
                img={card.image_path}
              />
            ))
          ) : (
            <p className="font-thin text-[20px] text-dark/70 dark:text-light/70 m-auto">
              There isn't any roadmap
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Roadmaps;
