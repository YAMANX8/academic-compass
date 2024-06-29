import { useMemo, useEffect, useReducer, useCallback } from "react";

import { CmsContext } from "./cms-context";
import { useGetCurriculum, useGetTopicsFromL1 } from "../../apis/cms";
import { useParams } from "../../routes/hooks/use-params";
import { toast } from "react-toastify";
// ----------------------------------------------------------------------
const Types = {
  INITIAL: "INITIAL",
  UPDATE_TOPICS_ARRAY: "UPDATE_TOPICS_ARRAY",
};

const initialState = {
  assigningTopics: [],
  curriculum: {
    courseTitle: "",
    topics: [
      //{
      //  id: 0,
      //  title: "",
      //  lessons: [],
      //}
    ],
  },
  details: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL": {
      return {
        ...state,
        curriculum: action.payload.curriculum,
        assigningTopics: action.payload.topics,
      };
    }
    case "UPDATE_TOPICS_ARRAY": {
      return {
        ...state,
        curriculum: {
          ...state.curriculum,
          topics: [...state.curriculum.topics, action.payload.newTopic],
        },
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
  const getTopics = useGetTopicsFromL1();
  // TODO: initialize
  const initialize = useCallback(async () => {
    try {
      const curriculum = await getCurriculum(id);
      const topics = await getTopics();
      console.log(curriculum);
      dispatch({
        type: Types.INITIAL,
        payload: {
          topics,
          curriculum: {
            courseTitle: curriculum.course_title,
            topics: curriculum.topics,
          },
          details: {},
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          assigningTopics: [],
          curriculum: {
            courseTitle: "",
            topics: [],
          },
        },
      });
    }
  }, []);
  // TODO: functions
  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleNewTopic = (newTopic) => {
    try {
      const parsedTopic = JSON.parse(newTopic);

      const newTopicObject = {
        id: parsedTopic.topic_level1_id,
        title: parsedTopic.topic_title,
        lessons: [],
      };
      // Check if the topic already exists
      const topicExists = state.curriculum.topics.some(
        (topic) => topic.id === newTopicObject.id,
      );

      if (topicExists) {
        throw new Error("Topic Already Exists!");
      }
      dispatch({
        type: Types.UPDATE_TOPICS_ARRAY,
        payload: {
          newTopic: newTopicObject,
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  // TODO: returned variable
  const memoizedValue = useMemo(
    () => ({
      ...state,
      // Methods.
      handleNewTopic,
    }),
    [state],
  );
  console.log(memoizedValue);
  return (
    <CmsContext.Provider value={memoizedValue}>{children}</CmsContext.Provider>
  );
}
