import useAxios from "../hooks/use-axios";
import { endpoints } from "../utils/axios";
import { useAuthContext } from "../auth/hooks";
// ___________________________________________________________
export const useGetRoadmaps = () => {
  const axios = useAxios();
  const getData = async () => {
    const response = await axios.get(endpoints.roadmaps.getAll);
    return response.data.data.dataresult;
  };
  return getData;
};
// ___________________________________________________________
export const useGetTopics0 = () => {
  const axios = useAxios();
  const { user, authenticated } = useAuthContext();

  const getData = async (id) => {
    let response;
    if (!authenticated)
      response = await axios.get(
        `${endpoints.roadmaps.topics.levelZero.user}/${id}`
      );
    else
      response = await axios.get(
        `${endpoints.roadmaps.topics.levelZero.student}/${id}`,
        {
          headers: {
            token: user?.accessToken,
          },
        }
      );
    const topics = response.data.topics;
    let progress = [];
    if (authenticated) {
      progress = await response.data.progress;
    }
    return { topics, progress };
  };

  return getData;
};
// ___________________________________________________________
export const useGetTopics1 = () => {
  const axios = useAxios();
  const { user, authenticated } = useAuthContext();

  const getData = async (id) => {
    let response;
    if (!authenticated)
      response = await axios.get(
        `${endpoints.roadmaps.topics.levelOne.user}/${id}`
      );
    else
      response = await axios.get(
        `${endpoints.roadmaps.topics.levelOne.student}/${id}`,
        {
          headers: {
            token: user?.accessToken,
          },
        }
      );
    const topics = response.data.topics;
    let progress = [];
    if (authenticated) {
      progress = await response.data.progress;
    }
    return { topics, progress };
  };

  return getData;
};
// ___________________________________________________________
export const useGetTopicsN = () => {
  const axios = useAxios();
  const { user, authenticated } = useAuthContext();

  const getData = async (id) => {
    let response;
    if (!authenticated)
      response = await axios.get(
        `${endpoints.roadmaps.topics.levelN.user}/${id}`
      );
    else
      response = await axios.get(
        `${endpoints.roadmaps.topics.levelN.student}/${id}`,
        {
          headers: {
            token: user?.accessToken,
          },
        }
      );
    const topics = response.data.topics;
    let progress = [];
    if (authenticated) {
      progress = await response.data.progress;
    }
    return { topics, progress };
  };

  return getData;
};
// ___________________________________________________________
export const useHandleState = () => {
  const axios = useAxios();
  const { user } = useAuthContext();

  const setData = async (state, topicId, topicLevel) => {
    const res = await axios.post(
      endpoints.roadmaps.topics.newState,
      JSON.stringify({
        topic_id: topicId,
        topic_level: topicLevel,
        state_id: state,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          token: user?.accessToken,
        },
      }
    );
    return res;
  };

  return setData;
};
// ___________________________________________________________
export const useHandleReset = () => {
  const axios = useAxios();
  const { user } = useAuthContext();

  const deleteData = async (topicId, topicLevel) => {
    const res = await axios.delete(
      `${endpoints.roadmaps.topics.resetState}/${topicId}/${topicLevel}`,
      {
        headers: {
          "Content-Type": "application/json",
          token: user?.accessToken,
        },
      }
    );
    return res;
  };

  return deleteData;
};
