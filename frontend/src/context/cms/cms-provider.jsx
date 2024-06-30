import { useMemo, useEffect, useReducer, useCallback } from "react";
import { CmsContext } from "./cms-context";
import {
  useGetCurriculum,
  useGetTopicsFromL1,
  useGetTopicsFromL2,
  useGetTopicsFromLn,
  usePostNewItem,
  useDeleteItem,
} from "../../apis/cms";
import { useParams } from "../../routes/hooks/use-params";
import { toast } from "react-toastify";
// ----------------------------------------------------------------------
const Types = {
  INITIAL: "INITIAL",
  UPDATE_TOPICS_ARRAY: "UPDATE_TOPICS_ARRAY",
  UPDATE_TOPICS_L2_ARRAY: "UPDATE_TOPICS_L2_ARRAY",
  INSERT_NEW_ITEM: "INSERT_NEW_ITEM",
  INSERT_NEW_ITEM_LN: "INSERT_NEW_ITEM_LN",
  HANDLE_CHANGE_NEW_ITEM: "HANDLE_CHANGE_NEW_ITEM",
  CLEAR_NEW_ITEM: "CLEAR_NEW_ITEM",
};

const initialState = {
  assigningTopics: [],
  topicsL2: [
    //{
    // topic_id: 0,
    // topic_title: "",
    //},
  ],
  topicsLn: [],
  selectedTopics: {
    L2: "",
    L3: "",
  },
  newItem: {
    itemTitle: "",
    topics: [],
    item_type: "",
  },
  curriculum: {
    courseTitle: "",
    topics: [
      //{
      //  id: 0,
      //  title: "",
      //  lessons: [],
      //},
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
    case "UPDATE_TOPICS_L2_ARRAY": {
      return {
        ...state,
        topicsL2: action.payload.topics,
      };
    }
    case "INSERT_NEW_ITEM": {
      return {
        ...state,
        newItem: {
          ...state.newItem,
          topics: [...state.newItem.topics, action.payload.newItemTopic],
        },
        selectedTopics: {
          ...state.selectedTopics,
          L2: action.payload.selectedTopic,
        },
        topicsLn: action.payload.topics,
      };
    }
    case "INSERT_NEW_ITEM_LN": {
      return {
        ...state,
        newItem: {
          ...state.newItem,
          topics: [...state.newItem.topics, action.payload.newItemTopic],
        },
        selectedTopics: {
          ...state.selectedTopics,
          L3: action.payload.newItemTopic,
        },
      };
    }
    case "HANDLE_CHANGE_NEW_ITEM": {
      return {
        ...state,
        newItem: {
          ...state.newItem,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case "CLEAR_NEW_ITEM": {
      return {
        ...state,
        newItem: {
          itemTitle: "",
          item_type: "",
          topics: [],
        },
        selectedTopics: {
          L2: "",
          L3: "",
        },
        topicsLn: [],
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
  const getTopicsL2 = useGetTopicsFromL2();
  const getTopicsLn = useGetTopicsFromLn();
  const postNewItem = usePostNewItem();
  const deleteItem = useDeleteItem();
  // TODO: initialize
  const initialize = useCallback(async () => {
    try {
      const curriculum = await getCurriculum(id);
      const topics = await getTopics();
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
        topic_level1_id: parsedTopic.topic_level1_id,
        parent_topic_title: parsedTopic.topic_title,
        lessons: [],
      };
      const topicExists = state.curriculum.topics.some(
        (topic) => topic.topic_level1_id === newTopicObject.topic_level1_id,
      );

      if (topicExists) {
        throw new Error("Topic Already Exists!");
      }
      toast.success("Topic Added Successfully");

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
  const getTopicsFromL2 = async (id) => {
    try {
      const topicsL2 = await getTopicsL2(id);
      dispatch({
        type: Types.UPDATE_TOPICS_L2_ARRAY,
        payload: {
          topics: topicsL2,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const insertNewItemTopicL2 = async (id) => {
    try {
      if (id) {
        const topicsLn = await getTopicsLn(id);
        dispatch({
          type: Types.INSERT_NEW_ITEM,
          payload: {
            newItemTopic: id,
            selectedTopic: id,
            topics: topicsLn,
          },
        });
      } else {
        clear();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const insertNewItemTopicLn = (id) => {
    dispatch({
      type: Types.INSERT_NEW_ITEM_LN,
      payload: {
        newItemTopic: id,
      },
    });
  };
  const handleChangeForNewItem = (value, type) => {
    if (type == 1)
      dispatch({
        type: "HANDLE_CHANGE_NEW_ITEM",
        payload: {
          name: "item_type",
          value: value,
        },
      });
    else {
      dispatch({
        type: "HANDLE_CHANGE_NEW_ITEM",
        payload: {
          name: "itemTitle",
          value: value,
        },
      });
    }
  };
  const clear = () => {
    dispatch({
      type: Types.CLEAR_NEW_ITEM,
    });
  };
  const handlePostNewItem = async (e, toggleModal) => {
    e.preventDefault();
    try {
      if (!state.newItem.itemTitle) throw new Error("Lesson Title Required!");
      if (state.newItem.topics.length == 0)
        throw new Error("Please Select a Topic!");
      if (!state.newItem.item_type) throw new Error("Lesson Type Required!");
      const res = await postNewItem(id, state.newItem);
      toggleModal();
      initialize();
      toast.success("New Lesson Added Successfully");
      console.log(res);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const handleDeleteItem = async (id) => {
    try {
      const res = await deleteItem(id);
      initialize();
      toast.warning("Lesson Deleted Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  // TODO: returned variable
  const memoizedValue = useMemo(
    () => ({
      ...state,
      // Methods.
      clear,
      handleNewTopic,
      getTopicsFromL2,
      insertNewItemTopicL2,
      insertNewItemTopicLn,
      handleChangeForNewItem,
      handlePostNewItem,
      handleDeleteItem,
    }),
    [state],
  );
  console.log(memoizedValue);
  return (
    <CmsContext.Provider value={memoizedValue}>{children}</CmsContext.Provider>
  );
}
