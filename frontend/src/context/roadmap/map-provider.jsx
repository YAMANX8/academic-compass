import { useMemo, useEffect, useReducer, useCallback } from "react";

import { MapContext } from "./map-context";

import {
  useGetRoadmaps,
  useGetTopics0,
  useHandleState,
  useHandleReset,
  useGetTopics1,
  useGetTopicsN,
} from "../../apis/roadmap.js";

import { toast } from "react-toastify";
import { mergeTopicsWithProgress, updateTopicState } from "./utils.js";
import { useAuthContext } from "../../auth/hooks";

// ----------------------------------------------------------------------
const Types = {
  INITIAL: "INITIAL",
  SET_ROADMAPS: "SET_ROADMAPS",
  SET_TOPICS_0: "SET_TOPICS_0",
  SET_TOPICS_1: "SET_TOPICS_1",
  SET_TOPICS_N: "SET_TOPICS_N",
  HANDLE_TOPICS_STATE: "HANDLE_TOPICS_STATE",
};

const initialState = {
  roadmaps: [],
  topics0: [],
  topics1: [],
  topicsN: [],
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL": {
      return {
        roadmaps: [],
        loading: false,
      };
    }
    case "SET_ROADMAPS": {
      return {
        ...state,
        roadmaps: action.payload.roadmaps,
        loading: false,
      };
    }
    case "SET_TOPICS_0": {
      return {
        ...state,
        topics0: action.payload.topics,
      };
    }
    case "SET_TOPICS_1": {
      return {
        ...state,
        topics1: action.payload.topics,
      };
    }
    case "SET_TOPICS_N": {
      return {
        ...state,
        topicsN: action.payload.topics,
      };
    }
    case "HANDLE_TOPICS_STATE": {
      if (action.payload.topicLevel == 1) {
        const newTopics = updateTopicState(
          action.payload.topicId,
          action.payload.state,
          state.topics0
        );
        return {
          ...state,
          topics0: newTopics,
        };
      } else if (action.payload.topicLevel == 2) {
        const newTopics = updateTopicState(
          action.payload.topicId,
          action.payload.state,
          state.topics1
        );
        return {
          ...state,
          topics1: newTopics,
        };
      }
      const newTopics = updateTopicState(
        action.payload.topicId,
        action.payload.state,
        state.topicsN
      );
      return {
        ...state,
        topicsN: newTopics,
      };
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

// ----------------------------------------------------------------------
export function MapProvider({ children }) {
  const get_roadmaps = useGetRoadmaps();
  const get_topics0 = useGetTopics0();
  const get_topics1 = useGetTopics1();
  const get_topicsN = useGetTopicsN();
  const handle_topics_state = useHandleState();
  const handle_reset = useHandleReset();
  const { authenticated } = useAuthContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  // GETTERS
  const getAllRoadmaps = useCallback(async () => {
    try {
      const data = await get_roadmaps();
      dispatch({
        type: Types.SET_ROADMAPS,
        payload: {
          roadmaps: data,
        },
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: Types.INITIAL,
      });
    }
  }, []);

  const getTopics0 = useCallback(
    async (roadmapId) => {
      try {
        const { topics, progress } = await get_topics0(roadmapId);

        const topicsAfterMerging = await mergeTopicsWithProgress(
          progress,
          topics
        );

        dispatch({
          type: "SET_TOPICS_0",
          payload: {
            topics: topicsAfterMerging,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [authenticated]
  );

  const getTopics1 = useCallback(
    async (topicId) => {
      try {
        const { topics, progress } = await get_topics1(topicId);

        const topicsAfterMerging = await mergeTopicsWithProgress(
          progress,
          topics
        );

        dispatch({
          type: "SET_TOPICS_1",
          payload: {
            topics: topicsAfterMerging,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [authenticated]
  );

  const getTopicsN = useCallback(
    async (topicId) => {
      try {
        const { topics, progress } = await get_topicsN(topicId);

        const topicsAfterMerging = await mergeTopicsWithProgress(
          progress,
          topics
        );

        dispatch({
          type: "SET_TOPICS_N",
          payload: {
            topics: topicsAfterMerging,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [authenticated]
  );

  // TOPICS STATUS
  const handleState = useCallback(
    async (state, topicId, topicLevel, modalWindow) => {
      try {
        const handleState = await handle_topics_state(
          state,
          topicId,
          topicLevel
        );

        modalWindow(false);
        dispatch({
          type: "HANDLE_TOPICS_STATE",
          payload: {
            state: state,
            topicId: topicId,
            topicLevel: topicLevel,
          },
        });
        toast.success(`Topic state is updated successfully`);
      } catch (err) {
        if (err == "Not Authorized") toast.error("Your need to login first!!");
        else toast.error("Something went wrong!");
      }
    },
    []
  );

  const handleReset = useCallback(async (topicId, topicLevel, modalWindow) => {
    try {
      const handleReset = await handle_reset(topicId, topicLevel);

      modalWindow(false);
      dispatch({
        type: "HANDLE_TOPICS_STATE",
        payload: {
          state: 0,
          topicId: topicId,
          topicLevel: topicLevel,
        },
      });
      toast.success(`Topic state is updated successfully`);
    } catch (err) {
      if (err == "Not Authorized") toast.error("Your need to login first!!");
      else toast.error("Something went wrong!");
    }
  }, []);

  // ----------------------------------------------------------------------

  const checkRoadmaps = state.roadmaps ? "yes" : "no";

  const status = state.loading ? "loading" : checkRoadmaps;
  const memoizedValue = useMemo(
    () => ({
      roadmaps: state.roadmaps,
      topics0: state.topics0,
      topics1: state.topics1,
      topicsN: state.topicsN,
      loading: status === "loading",
      count: status === "yes" ? state.roadmaps.length : 0,
      // Methods.
      getAllRoadmaps,
      getTopics0,
      getTopics1,
      getTopicsN,
      handleState,
      handleReset,
    }),
    [
      getAllRoadmaps,
      getTopics0,
      getTopics1,
      getTopicsN,
      handleState,
      handleReset,
      state.roadmaps,
      state.topics0,
      state.topics1,
      state.topicsN,
      status,
    ]
  );
  return (
    <MapContext.Provider value={memoizedValue}>{children}</MapContext.Provider>
  );
}
