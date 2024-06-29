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
      endpoints.course.manage.curriculum.getTopicsL1,
    );
    const data = response.data;

    return data;
  };

  return getData;
};
// ___________________________________________________

export const useGetTopicsFromL2 = () => {
  const axios = useAxios();

  const getData = async (id) => {
    const response = await axios.get(
      `${endpoints.course.manage.curriculum.getTopicsL2}/${id}`,
    );
    const data = response.data;

    return data;
  };

  return getData;
};
// ___________________________________________________

export const useGetTopicsFromLn = () => {
  const axios = useAxios();

  const getData = async (id) => {
    const response = await axios.get(
      `${endpoints.course.manage.curriculum.getTopicsLn}/${id}`,
    );
    const data = response.data;

    return data;
  };

  return getData;
};
// ___________________________________________________

export const usePostNewItem = () => {
  const axios = useAxios();
  const postData = async (id, data) => {
    const response = await axios.post(
      `${endpoints.course.manage.curriculum.newItem}/${id}`,
      JSON.stringify(data),
    );

    return response;
  };

  return postData;
};
