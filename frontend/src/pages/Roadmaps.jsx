import React from "react";
import { useState, useEffect } from "react";
import { RoadmapCard } from "../components/index.js";
import axios from "../apis/axios.js";

function Roadmaps() {
  const [roadCards, setRoadCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/roadmap");
        setRoadCards(response.data.data.dataresult);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <section>
        <h2 className="text-[48px] font-semibold leading-[125%] tracking-tight mb-12">
          Our Roadmaps
        </h2>
        <div className="flex flex-col gap-[60px]">
          {roadCards.map((card, index) => (
            <RoadmapCard
              key={card.roadmap_id}
              order={index}
              title={card.roadmap_title}
              description={card.roadmap_description}
              img={card.image_path}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Roadmaps;
