import useAxios from "../hooks/use-axios";
import { endpoints } from "../utils/axios";

// _________________________________
export const useGetCourseDetails = () => {
  const axios = useAxios();

  const getData = async (id) => {
    const res = await axios.get(`/course/${id}`);
    return res;
  };

  return getData;
};
// _________________________________
export const usePostEnroll = () => {
  const axios = useAxios();

  const postData = async (id) => {
    const res = await axios.post(
      `/course/enroll`,
      JSON.stringify({
        courseId: id,
      }),
    );
    return res;
  };

  return postData;
};
