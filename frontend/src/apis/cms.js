import useAxios from "../hooks/use-axios";
import { endpoints } from "../utils/axios";

export const useGetCurriculum = () => {
  const axios = useAxios();

  const getData = async () => {
    const response = await axios.get(endpoints.course.manage.curriculum);
    const data = response.data;

    return data;
  };

  return getData;
};