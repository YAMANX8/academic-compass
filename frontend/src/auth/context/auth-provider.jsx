import { useMemo, useEffect, useReducer, useCallback } from "react";

import axios, { endpoints } from "../../utils/axios";

import { AuthContext } from "./auth-context";
import { isValidToken } from "./utils";
import { useRefreshToken } from "../hooks/use-refresh";
import {
  setStorage,
  removeStorage,
  getStorage,
} from "../../hooks/use-local-storage";
import { toast } from "react-toastify";

const Types = {
  INITIAL: "INITIAL",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT",
  UPDATE: "UPDATE",
};

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.UPDATE) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = "in";

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const loggedIn = getStorage(STORAGE_KEY);
  const refresh = useRefreshToken();
  const initialize = useCallback(async () => {
    try {
      let accessToken;
      if (loggedIn) {
        accessToken = await refresh();
      }
      if (accessToken && isValidToken(accessToken)) {
        const res = await axios.get(endpoints.student.auth.me, {
          headers: {
            token: accessToken,
          },
        });
        const user = res.data.user;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const studentLogin = useCallback(async (email, password) => {
    const data = {
      email,
      password,
    };

    const res = await axios.post(endpoints.student.auth.login, data, {
      withCredentials: true,
    });

    const accessToken = res.data.token;
    const user = res.data.user;

    // console.log("decoded jwt: ",jwtDecode(accessToken))
    setStorage(STORAGE_KEY, true);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken,
        },
      },
    });

    toast.success("Login successfully");
  }, []);

  const instructorLogin = useCallback(async (email, password) => {
    const data = {
      email,
      password,
    };

    const res = await axios.post(endpoints.instructor.auth.login, data, {
      withCredentials: true,
    });

    const accessToken = res.data.token;
    const user = res.data.user;

    // console.log(jwtDecode(accessToken))
    setStorage(STORAGE_KEY, true);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken,
        },
      },
    });

    toast.success("Login successfully");
  }, []);

  // REGISTER
  const studentRegister = useCallback(
    async (email, password, first_name, last_name) => {
      const data = {
        email,
        password,
        first_name,
        last_name,
      };

      const res = await axios.post(endpoints.student.auth.register, data, {
        withCredentials: true,
      });

      const accessToken = res.data.token;
      const user = res.data.user;

      // console.log(jwtDecode(accessToken))
      setStorage(STORAGE_KEY, true);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {
            ...user,
            accessToken,
          },
        },
      });
      toast.success("Registration completed successfully☺");
    },
    []
  );
  const instructorRegister = useCallback(
    async (email, password, first_name, last_name) => {
      const data = {
        email,
        password,
        first_name,
        last_name,
      };

      const res = await axios.post(endpoints.instructor.auth.register, data, {
        withCredentials: true,
      });

      const accessToken = res.data.token;
      const user = res.data.user;

      // console.log(jwtDecode(accessToken))
      setStorage(STORAGE_KEY, true);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {
            ...user,
            accessToken,
          },
        },
      });
      toast.success("Registration completed successfully☺");
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    removeStorage(STORAGE_KEY);
    const res = await axios.get(endpoints.logout, {
      withCredentials: true,
    });
    // console.log(res)
    dispatch({
      type: Types.LOGOUT,
    });
    toast("Logout Successfully");
  }, []);

  // Function to update access token
  const updateAccessToken = useCallback(
    (newAccessToken) => {
      if (newAccessToken) {
        dispatch({
          type: Types.UPDATE,
          payload: {
            user: {
              ...state.user,
              accessToken: newAccessToken,
            },
          },
        });
      }
    },
    [state.user]
  );
  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const role = state?.user?.role_id == 1 ? "instructor" : "student";

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      role: role,
      method: "jwt",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      // Methods.
      studentLogin,
      instructorLogin,
      studentRegister,
      instructorRegister,
      logout,
      updateAccessToken,
    }),
    [
      studentLogin,
      instructorLogin,
      logout,
      studentRegister,
      instructorRegister,
      updateAccessToken,
      state.user,
      status,
    ]
  );
  console.log(memoizedValue);
  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
