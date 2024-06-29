import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Ratings, Card } from "../../../components";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  course_title: "HTML Basics for Beginners",
  items: "8",
  enrollments: "10",
  reviews: "3",
  average_rating: "4.0",
};

const Status = () => {
  const chartData = {
    labels: ["Items", "Enrollments", "Reviews"],
    datasets: [
      {
        label: "# of Votes",
        data: [data.items, data.enrollments, data.reviews],
        backgroundColor: [
          "rgba(37, 58, 212, 1)",
          "rgba(103, 219, 41, 1)",
          "rgba(106, 30, 173, 1)",
        ],
        hoverBackgroundColor: [
          "rgba(37, 58, 212, 0.7)",
          "rgba(103, 219, 41, 0.7)",
          "rgba(106, 30, 173, 0.7)",
        ],
      },
    ],
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">{data.course_title}</h1>
      <Card>
        <div className="w-full max-w-4xl rounded-lg  p-6 ">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-lg font-semibold">Average Ratings</h2>
            <div className="flex items-center justify-center">
              <Ratings rating={parseFloat(data.average_rating)} />
              <span className="ml-2 text-gray-600">
                {data.average_rating} out of 5.0
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 items-center gap-60 md:grid-cols-2">
            <div className="order-last flex justify-center md:order-first md:justify-end">
              <div>
                <div className="space-y-8">
                  <div className="flex flex-col items-start space-y-3">
                    <span className="text-2xl">Enrollments</span>
                    <span className="text-2xl">{data.enrollments}</span>
                  </div>
                  <div className="flex flex-col items-start space-y-3">
                    <span className="text-2xl">Lessons</span>
                    <span className="text-2xl">{data.items}</span>
                  </div>
                  <div className="flex flex-col items-start space-y-3">
                    <span className="text-2xl">Reviews</span>
                    <span className="text-2xl">{data.reviews}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center md:col-span-1 md:mt-0">
              <div className="h-80 w-80">
                <Doughnut
                  data={chartData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Status;
