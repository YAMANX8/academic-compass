import { useMemo, useEffect, useReducer, useCallback } from "react";

import { CmsContext } from "./cms-context";

// ----------------------------------------------------------------------
const Types = {
  INITIAL: "INITIAL",
};

const initialState = {
  curriculum: {},
  details: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL": {
      return {
        ...state,
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
  // TODO: initialize
  const initialize = useCallback(async () => {
    try {
      dispatch({
        type: Types.INITIAL,
        payload: { curriculum: {}, details: {} },
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

  // TODO: returned variable
  const memoizedValue = useMemo(
    () => ({
      ...state,
      // Methods.
    }),
    [],
  );
  console.log(memoizedValue);
  return (
    <CmsContext.Provider value={memoizedValue}>{children}</CmsContext.Provider>
  );
}
