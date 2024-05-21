import useAxios from "../hooks/use-axios";
import { endpoints } from "../utils/axios";

export const useGetOverview = () => {
  const axios = useAxios();

  const getData = async () => {
    const response = await axios.get(endpoints.instructor.dashboard.overview);
    const data = response.data;

    // Handling null values in the response
    const processedData = {
      instructor_rating: data.instructor_rating ?? 0,
      performance:
        data.performance?.map((perf) => ({
          ...perf,
          count: perf.count ?? 0,
        })) ?? [],
      topics: data.topics ?? [],
    };

    return processedData;
  };

  return getData;
};
// ___________________________________________________________ //
export const useGetInprogressCourses = () => {
  const axios = useAxios();
  const getData = async () => {
    const response = await axios.get(
      endpoints.instructor.dashboard.inProgressCourses,
    );
    // console.log(response)

    const data = response.data.inProgressCourses;
    return data;
  };

  return getData;
};
// ___________________________________________________________ //
export const useGetCompletedCourses = () => {
  const axios = useAxios();
  const getData = async () => {
    const response = await axios.get(
      endpoints.instructor.dashboard.completedCourses,
    );
    // console.log(response)
    const data = response.data.completedCourses;
    return data;
  };
  return getData;
};
// ___________________________________________________________ //
