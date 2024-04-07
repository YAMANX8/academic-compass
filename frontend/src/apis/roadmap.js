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
// TODO: refactor to use this hook instead of the previous hooks.
// ___________________________________________________________
export const useGetTopicsByLevel = (level) => {
  const axios = useAxios();
  const { user, authenticated } = useAuthContext();

  const getData = async (id) => {
    const levelKey = `level${level}`;
    const endpointType = authenticated ? "student" : "user";
    const endpoint =
      endpoints.roadmaps.topics?.[levelKey]?.[endpointType] ||
      endpoints.roadmaps.topics.levelN?.[endpointType];

    try {
      const response = await axios.get(`${endpoint}/${id}`, {
        headers: authenticated ? { token: user?.accessToken } : {},
      });

      const { topics, progress = [] } = response.data;
      return { topics, progress };
    } catch (error) {
      console.error(`Failed to fetch topics for level ${level}:`, error);
      throw error;
    }
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
