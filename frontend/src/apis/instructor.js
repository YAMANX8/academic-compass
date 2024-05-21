import useAxios from "../hooks/use-axios";
import { endpoints } from "../utils/axios";

export const useGetOverview = () => {
  const axios = useAxios();

  const getData = async () => {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  return getData;
};

export const useGetInprogressCourses = () => {
  const axios = useAxios();
  const getData = async () => {
    try {
      const response = await axios.get(
        endpoints.instructor.dashboard.inProgressCourses,
      );
      // console.log(response)
      
      const data = response.data.inProgressCourses;
      return data;
    } catch (error) {
      throw error;
    }
  };

  return getData;
};
