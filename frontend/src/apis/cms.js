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
// ___________________________________________________

export const useDeleteItem = () => {
  const axios = useAxios();
  const deleteData = async (id) => {
    const response = await axios.delete(
      `${endpoints.course.manage.curriculum.deleteItem}/${id}`,
    );
    return response;
  };
  return deleteData;
};
// ___________________________________________________

export const useUploadVideo = () => {
  const axios = useAxios();
  const putData = async (id, formData) => {
    // console.log(formData, id);
    const response = await axios.put(
      `${endpoints.course.manage.curriculum.uploadVideo}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response;
  };
  return putData;
};
// ___________________________________________________

export const useGetVideo = () => {
  const axios = useAxios();
  const getData = async (id) => {
    // console.log(formData, id);
    const response = await axios.get(
      `${endpoints.course.manage.curriculum.getVideo}/${id}`,
    );
    if (response.data.length == 0) return null;
    return response.data[0];
  };
  return getData;
};
// ___________________________________________________

export const useGetQuestions = () => {
  const axios = useAxios();

  const getData = async (id) => {
    const response = await axios.get(
      `${endpoints.course.manage.curriculum.getQuestions}/${id}`,
    );
    return response.data;
  };

  return getData;
};
// ___________________________________________________

export const usePostQuestion = () => {
  const axios = useAxios();

  const postData = async (id, question) => {
    const response = await axios.post(
      `${endpoints.course.manage.curriculum.postQuestion}/${id}`,
      question,
    );
    return response.data;
  };

  return postData;
};
// ___________________________________________________

export const useDeleteQuestion = () => {
  const axios = useAxios();

  const deleteData = async (id) => {
    const response = await axios.delete(
      `${endpoints.course.manage.curriculum.deleteQuestion}/${id}`,
    );
    return response.data;
  };

  return deleteData;
};
// ___________________________________________________

export const useGetQuestion = () => {
  const axios = useAxios();

  const getData = async (id) => {
    const response = await axios.get(
      `${endpoints.course.manage.curriculum.getQuestion}/${id}`,
    );
    return response.data;
  };

  return getData;
};
// ___________________________________________________

export const useGetArticle = () => {
  const axios = useAxios();

  const getData = async (id) => {
    const response = await axios.get(
      `${endpoints.course.manage.curriculum.getArticle}/${id}`,
    );
    return response.data;
  };

  return getData;
};
// ___________________________________________________

export const usePutArticle = () => {
  const axios = useAxios();

  const putData = async (id, data) => {
    const response = await axios.put(
      `${endpoints.course.manage.curriculum.putArticle}/${id}`,
      data,
    );
    return response.data;
  };

  return putData;
};
