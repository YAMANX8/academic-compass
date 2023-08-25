import React from 'react'
import { useState, useEffect } from "react";
import { RoadmapCard } from "../components/index.js";
import  axios  from "../apis/axios.js";
function Roadmaps() {
  const [roadCards, setRoadCards] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/home");
        setRoadCards(response.data.roadmaps)
       
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    
    <div>

   {/* popular roadmaps section */}
   <section>
        <h2 className="text-[48px] font-semibold leading-[125%] tracking-tight mb-12">
          Popular Roadmaps
        </h2>
        <div className="flex flex-col gap-[60px]">
          {roadCards.map((card, index) => (
            <RoadmapCard
              key={card.roadmap_id}
              order={index}
              title={card.roadmap_title}
              description={card.roadmap_description}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Roadmaps;