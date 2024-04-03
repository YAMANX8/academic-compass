import axios from "../../utils/axios";
import { useAuthContext } from "./use-auth-context";
// __________________________________________________
export const useRefreshToken = () => {
  const { updateAccessToken } = useAuthContext();

  const refresh = async () => {
    const response = await axios.get("/refresh", { withCredentials: true });
    const accessToken = response.data.token;
    console.log(accessToken);
    if (updateAccessToken) updateAccessToken(accessToken);
    return response.data.token;
  };
  return refresh;
};
