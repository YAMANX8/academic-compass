import { useMemo, useEffect, useReducer, useCallback } from "react";

import { CmsContext } from "./cms-context";
import { useGetCurriculum } from "../../apis/cms";
import { useParams } from "../../routes/hooks/use-params";
// ----------------------------------------------------------------------
const Types = {
  INITIAL: "INITIAL",
};

const initialState = {
  curriculum: {
    courseTitle: "",
    topics: [],
  },
  details: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL": {
      return {
        ...state,
        curriculum: action.payload.curriculum,
      };
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

// ----------------------------------------------------------------------
export function CmsProvider({ children }) {
  // TODO: states
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();
  const getCurriculum = useGetCurriculum();
  // TODO: initialize
  const initialize = useCallback(async () => {
    try {
      const data = await getCurriculum(id);

      console.log(data);
      dispatch({
        type: Types.INITIAL,
        payload: {
          curriculum: {
            courseTitle: data.course_title,
            topics: data.topics,
          },
          details: {},
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {},
      });
    }
  }, []);
  // TODO: functions
  useEffect(() => {
    initialize();
  }, [initialize]);

  // const handleNewTopic = () => {

  // };
  // TODO: returned variable
  const memoizedValue = useMemo(
    () => ({
      ...state,
      // Methods.
    }),
    [state],
  );
  console.log(memoizedValue);
  return (
    <CmsContext.Provider value={memoizedValue}>{children}</CmsContext.Provider>
  );
}
