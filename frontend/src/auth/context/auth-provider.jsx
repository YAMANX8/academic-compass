import { useMemo, useEffect, useReducer, useCallback } from "react";

import axios, { endpoints } from "../../utils/axios";

import { AuthContext } from "./auth-context";
import { setSession, isValidToken, jwtDecode } from "./utils";

import { toast } from "react-toastify";

const Types = {
  INITIAL: "INITIAL",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT",
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
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = "accessToken";

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);
      // console.log(jwtDecode(accessToken))

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        // We need here to send the access token in the header.
        const res = await axios.get(endpoints.student.auth.me, {
          headers: {
            token: accessToken,
          },
        });
        // const { user } = res.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              // ...user,
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
  const login = useCallback(async (email, password) => {
    const data = {
      email,
      password,
    };

    const res = await axios.post(endpoints.student.auth.login, data);

    const accessToken = res.data.token;
    // const user = res.data.user;

    setSession(accessToken);
    // console.log(jwtDecode(accessToken))
    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          // ...user,
          accessToken,
        },
      },
    });

    toast.success("Login successfully");
  }, []);

  // REGISTER
  const register = useCallback(
    async (email, password, first_name, last_name) => {
      const data = {
        email,
        password,
        first_name,
        last_name,
      };

      const res = await axios.post(endpoints.student.auth.register, data);

      const accessToken = res.data.token;
      // const user = res.data.user;

      // Why we don't use the setSession util here?
      sessionStorage.setItem(STORAGE_KEY, accessToken);
      // console.log(jwtDecode(accessToken))

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {
            // ...user,
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
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
    toast("Logout Successfully");
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: "jwt",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      // Methods.
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
