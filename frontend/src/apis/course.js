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
// _________________________________
export const usePostReview = () => {
  const axios = useAxios();

  const postData = async (id, rating, review) => {
    const res = await axios.post(`/review/edit_review/${id}`, {
      stars_number: rating,
      review: review,
    });
    return res;
  };

  return postData;
};
// _________________________________
export const useGetReview = () => {
  const axios = useAxios();

  const postData = async (id) => {
    const res = await axios.get(`/review/show_review/${id}`);
    return res;
  };

  return postData;
};
// _________________________________
export const useDeleteReview = () => {
  const axios = useAxios();

  const postData = async (id) => {
    const res = await axios.delete(`/review/delete_review/${id}`);
    return res;
  };

  return postData;
};
