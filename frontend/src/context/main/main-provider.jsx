import { useMemo, useEffect, useReducer, useCallback } from "react";

import { MainContext } from "./main-context";

import { useGetLandingData } from "../../apis";

import { toast } from "react-toastify";

// ----------------------------------------------------------------------
const Types = {
  INITIAL: "INITIAL",
};

const initialState = {
  status: {},
  popularRoadmaps: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL": {
      return {
        ...state,
        status: action.payload.status,
        popularRoadmaps: action.payload.popularRoadmaps,
      };
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

// ----------------------------------------------------------------------
export function MainProvider({ children }) {
  const get_landing_data = useGetLandingData();
  const [state, dispatch] = useReducer(reducer, initialState);

  const getLanding = useCallback(async () => {
    try {
      const { status, popularRoadmaps } = await get_landing_data();
      dispatch({
        type: Types.INITIAL,
        payload: {
          status: {
            enrollments: status?.enrollments?.count,
            roadmaps: status?.roadmaps?.count,
            courses: status?.courses?.count,
            instructors: status?.instructors?.count,
          },
          popularRoadmaps: popularRoadmaps,
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          status: {
            courses: 0,
            roadmaps: 0,
            enrollments: 0,
            instructors: 0,
          },
          popularRoadmaps: [],
        },
      });
    }
  }, []);
  useEffect(() => {
    getLanding();
  }, [getLanding]);

  // ____________________________________________________________
  const memoizedValue = useMemo(
    () => ({
      ...state,
      // Methods.
      getLanding,
    }),
    [state.status, state.popularRoadmaps, getLanding]
  );
  return (
    <MainContext.Provider value={memoizedValue}>
      {children}
    </MainContext.Provider>
  );
}
