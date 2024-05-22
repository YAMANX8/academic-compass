import useAxios from "../hooks/use-axios";
import { endpoints } from "../utils/axios";
// import { useAuthContext } from "../auth/hooks";
// ___________________________________________________________
export const useGetLandingData = () => {
  const axios = useAxios();
  const getData = async () => {
    const response = await axios.get(endpoints.home);
    const { status, popularRoadmaps } = response.data;
    return { status, popularRoadmaps };
  };
  return getData;
};
// ___________________________________________________________
