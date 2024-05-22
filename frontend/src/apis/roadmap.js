import useAxios from "../hooks/use-axios";
import { endpoints } from "../utils/axios";
import { useAuthContext } from "../auth/hooks";
// ___________________________________________________________
export const useGetRoadmaps = () => {
  const axios = useAxios();
  const getData = async () => {
    const response = await axios.get(endpoints.roadmaps.getAll);
    return response.data.roadmaps;
  };
  return getData;
};
// ___________________________________________________________
export const useGetTopicsByLevel = (level) => {
  const axios = useAxios();
  const { authenticated } = useAuthContext();

  const getData = async (id) => {
    const levelKey = `level${level}`;
    const endpointType = authenticated ? "student" : "user";
    const endpoint =
      endpoints.roadmaps.topics?.[levelKey]?.[endpointType] ||
      endpoints.roadmaps.topics.levelN?.[endpointType];

    const response = await axios.get(`${endpoint}/${id}`);

    const { topics, progress = [], roadmap } = response.data;
    return { topics, progress, roadmap };
  };

  return getData;
};
// ___________________________________________________________
export const useHandleState = () => {
  const axios = useAxios();

  const setData = async (state, topicId, topicLevel) => {
    const res = await axios.post(
      endpoints.roadmaps.topics.newState,
      JSON.stringify({
        topic_id: topicId,
        topic_level: topicLevel,
        state_id: state,
      }),
    );
    return res;
  };

  return setData;
};
// ___________________________________________________________
export const useHandleReset = () => {
  const axios = useAxios();

  const deleteData = async (topicId, topicLevel) => {
    await axios.delete(
      `${endpoints.roadmaps.topics.resetState}/${topicId}/${topicLevel}`,
    );
  };

  return deleteData;
};
