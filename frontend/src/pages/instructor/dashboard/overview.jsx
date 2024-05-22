import { Card, PerformanceChart, Ratings, Button } from "../../../components";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PerformanceStatus from "./components/performance-status";
import RoadmapCard from "./components/roadmap-card";
import { useGetOverview } from "../../../apis/instructor";
import { useAuthContext } from "../../../auth/hooks";
import { Icon } from "@iconify/react";
import { paths } from "../../../routes/paths";
const Overview = () => {
  const getData = useGetOverview();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        setJson(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [json, setJson] = useState({
    instructor_rating: 0,
    performance: [
      {
        id: 1,
        title: "Enrollments",
        count: 0,
      },
      {
        id: 2,
        title: "Reviews",
        count: 0,
      },
      {
        id: 3,
        title: "Courses",
        count: 0,
      },
      {
        id: 4,
        title: "Students",
        count: 0,
      },
    ],
    topics: [
      {
        id: 2,
        roadmap_id: 18,
        title: "frontend",
      },
    ],
  });

  const performanceData = {
    labels: json.performance.map((item) => item.title),
    datasets: [
      {
        label: "Performance",
        data: json.performance.map((item) =>
          item.count > 0 ? item.count : 0.1,
        ),
        backgroundColor: [
          "rgba(37, 58, 212, 1)",
          "rgba(106, 30, 173, 1)",
          "rgba(0, 193, 252, 1)",
          "rgba(103, 219, 41, 1)",
        ],
        borderColor: [
          "rgba(37, 58, 212)",
          "rgba(106, 30, 173)",
          "rgba(0, 193, 252)",
          "rgba(103, 219, 41)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Dashboard: {user.first_name}</title>
      </Helmet>

      <div className="flex flex-col gap-4">
        <h2>Welcome back, {user.first_name}</h2>
        <div className="flex w-full gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <Card className="flex flex-col items-center">
              <p className="text-center text-2xl font-semibold">
                Ratings in Average
                <br /> {json.instructor_rating}
              </p>
              <Ratings size={24} rating={json.instructor_rating} />
            </Card>

            <Card title="My Roadmaps" className="flex-1 space-y-2">
              {json.topics.length > 0 ? (
                json.topics.map((item) => (
                  <RoadmapCard
                    key={item.id}
                    roadmapId={item.roadmap_id}
                    roadmapTitle={item.title}
                  />
                ))
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <p className="text-base font-medium text-gray-600">
                    You don’t have any course published in any roadmap
                  </p>
                  <Button page={paths.roadmaps}>
                    <Icon icon="mdi:map" />
                    See our roadmaps
                  </Button>
                </div>
              )}
            </Card>
          </div>

          <Card className="space-y-2">
            <PerformanceChart chartData={performanceData} />
            <div className="grid grid-cols-2 gap-2 py-2">
              {json.performance.map((item, index) => (
                <PerformanceStatus
                  title={item.title}
                  color={performanceData.datasets[0].backgroundColor[
                    index
                  ].replace(/[\d\.]+\)$/g, "0.2)")}
                  number={item.count}
                  key={item.id}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Overview;
