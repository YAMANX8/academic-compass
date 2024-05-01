import { FaRegMap as Map } from "react-icons/fa";
import Hero from "../../assets/images/hero.svg";
import { Link } from "react-router-dom";
import { RoadmapCard } from "../../components/index.js";
import { Helmet } from "react-helmet-async";
import { useMainContext } from "../../context/hooks/use-main-context.js";
// ______________________________________________________________________
function Home() {
  const { status, popularRoadmaps } = useMainContext();
  const heading = "text-[3rem] font-semibold tracking-tight leading-[125%]";
  const statusStyle =
    "flex flex-col gap-4 items-center text-[32px] tracking-tight leading-[125%]";
  return (
    <>
      <Helmet>
        <title>Academic Compass: Home</title>
      </Helmet>
      <main className="w-[1200px]">
        <section className="flex w-full items-center justify-between gap-4">
          {/* ************************************************************ */}
          <div className="flex flex-col items-start gap-5">
            <h1 className={`${heading} w-[488px]`}>
              <span className="text-primary">A Roadmap-Driven</span> Online
              Education Platform
            </h1>

            <p className="w-[488px] text-[32px] font-medium leading-[125%]">
              Unlocking Knowledge and Success Through Guided Learning Paths
            </p>
            <Link
              // to={paths.roadmaps}
              to="/test"
              className="flex items-center gap-[10px] rounded-[5px] bg-primary px-[20px] py-[10px] font-semibold text-light"
            >
              <Map className="text-[25px]" />
              Explore Our Roadmaps
            </Link>
          </div>

          {/* ******************************************************** */}
          <div className="h-[696px] w-[696px] ">
            <img src={Hero} />
          </div>
        </section>

        {/* status section */}
        <section className=" flex w-full justify-between bg-dark py-[27px] text-light shadow-[1000px_0_0_0,-1000px_0_0_0] shadow-dark transition-all duration-1000 ease-in-out-back">
          <div className={`${statusStyle}`}>
            <span>{status.enrollments}</span>
            <p>Enrollments</p>
          </div>
          <div className={`${statusStyle}`}>
            <span>{status.roadmaps}</span>
            <p>Roadmaps</p>
          </div>
          <div className={`${statusStyle}`}>
            <span>{status.courses}</span>
            <p>Courses</p>
          </div>
          <div className={`${statusStyle}`}>
            <span>{status.instructors}</span>
            <p>Instructors</p>
          </div>
        </section>

        {/* popular roadmaps section */}
        <section className="py-[48px]">
          <h2 className="mb-12 text-[48px] font-semibold leading-[125%] tracking-tight">
            Popular Roadmaps
          </h2>
          <div className="flex flex-col gap-[60px]">
            {popularRoadmaps.map((card, index) => (
              <RoadmapCard
                key={card.roadmap_id}
                id={card.roadmap_id}
                order={index}
                title={card.roadmap_title}
                description={card.roadmap_description}
                img={card.image_path}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
