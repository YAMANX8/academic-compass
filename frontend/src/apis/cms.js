import useAxios from "../hooks/use-axios";
import { endpoints } from "../utils/axios";

export const useGetCurriculum = () => {
  const axios = useAxios();

  const getData = async (id) => {
    const response = await axios.get(
      `${endpoints.course.manage.curriculum.index}/${id}`,
    );
    const data = response.data;

    return data;
  };

  return getData;
};
// ___________________________________________________

export const useGetTopicsFromL1 = () => {
  const axios = useAxios();

  const getData = async (id) => {
    const response = await axios.get(
      endpoints.course.manage.curriculum.getTopics,
    );
    const data = response.data;

    return data;
  };

  return getData;
};
