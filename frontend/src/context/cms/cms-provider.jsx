import { useMemo, useEffect, useReducer, useCallback } from "react";
import { CmsContext } from "./cms-context";
import {
  useGetCurriculum,
  useGetTopicsFromL1,
  useGetTopicsFromL2,
  useGetTopicsFromLn,
  usePostNewItem,
  useDeleteItem,
  useGetVideo,
  useUploadVideo,
  useGetQuestions,
  usePostQuestion,
  useDeleteQuestion,
  useGetQuestion,
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
  GET_UPLOAD_REPLACE_VIDEO: "GET_UPLOAD_REPLACE_VIDEO",
  CREATE_QUESTION: "CREATE_QUESTION",
  HANDLE_CHANGE_NEW_QUESTION: "HANDLE_CHANGE_NEW_QUESTION",
  GET_QUIZ: "GET_QUIZ",
  GET_QUESTION: "GET_QUESTION",
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
  video: null,
  newQuestion: {
    question_body: "",
    question_points: 0,
    question_no: 1,
    options: [
      {
        option_body: "",
        is_correct: true,
        option_no: 1,
      },
      {
        option_body: "",
        is_correct: false,
        option_no: 2,
      },
      {
        option_body: "",
        is_correct: false,
        option_no: 3,
      },
      {
        option_body: "",
        is_correct: false,
        option_no: 4,
      },
    ],
  },
  quiz: [],
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
    case "GET_UPLOAD_REPLACE_VIDEO": {
      return {
        ...state,
        video: action.payload.video,
      };
    }
    case "HANDLE_CHANGE_NEW_QUESTION": {
      const { name, value, index } = action.payload;
      if (name === "question_body") {
        return {
          ...state,
          newQuestion: {
            ...state.newQuestion,
            question_body: value,
          },
        };
      } else if (name === "is_correct") {
        const updatedOptions = state.newQuestion.options.map((option, i) => ({
          ...option,
          is_correct: i === index,
        }));
        return {
          ...state,
          newQuestion: {
            ...state.newQuestion,
            options: updatedOptions,
          },
        };
      } else if (name === "question_points") {
        return {
          ...state,
          newQuestion: {
            ...state.newQuestion,
            question_points: value,
          },
        };
      } else {
        const updatedOptions = state.newQuestion.options.map((option, i) =>
          i === index ? { ...option, [name]: value } : option,
        );
        return {
          ...state,
          newQuestion: {
            ...state.newQuestion,
            options: updatedOptions,
          },
        };
      }
    }
    case "GET_QUIZ": {
      return {
        ...state,
        quiz: action.payload.questions,
        newQuestion: {
          ...state.newQuestion,
          question_no: action.payload.orderOfNewQuestion,
        },
      };
    }
    case "GET_QUESTION": {
      return {
        ...state,
        newQuestion: {
          ...state.newQuestion,
          options: action.payload.values,
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
  const getTopicsL2 = useGetTopicsFromL2();
  const getTopicsLn = useGetTopicsFromLn();
  const postNewItem = usePostNewItem();
  const deleteItem = useDeleteItem();
  const getVideo = useGetVideo();
  const uploadVideo = useUploadVideo();
  const getQuestions = useGetQuestions();
  const postQuestion = usePostQuestion();
  const deleteQuestion = useDeleteQuestion();
  const getQuestion = useGetQuestion();
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
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const handleGetVideo = async (id) => {
    const res = await getVideo(id);
    dispatch({
      type: Types.GET_UPLOAD_REPLACE_VIDEO,
      payload: {
        video: "",
      },
    });
  };
  const handleUploadVideo = async (id, acceptedFile) => {
    const file = acceptedFile;
    dispatch({
      type: Types.GET_UPLOAD_REPLACE_VIDEO,
      payload: { video: URL.createObjectURL(file) },
    });
    const formData = new FormData();
    formData.append("video", file);
    console.log(file);
    // TODO: here I will call the api
    try {
      const res = await uploadVideo(id, formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReplaceVideo = async () => {
    dispatch({
      type: Types.GET_UPLOAD_REPLACE_VIDEO,
      payload: { video: null },
    });
  };
  const handleChangeNewQuestion = (value, name, index = null) => {
    dispatch({
      type: Types.HANDLE_CHANGE_NEW_QUESTION,
      payload: { name, value, index },
    });
  };
  const handleGetQuiz = async (id) => {
    try {
      const res = await getQuestions(id);
      const sortedData = res.sort(
        (a, b) => a.question_order - b.question_order,
      );
      dispatch({
        type: Types.GET_QUIZ,
        payload: {
          questions: sortedData,
          orderOfNewQuestion: sortedData.length + 1,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePostQuestion = async (id, itemId) => {
    try {
      if (!state.newQuestion.question_body)
        throw new Error("Question Body Required!");
      else if (state.newQuestion.question_points <= 0)
        throw new Error("Please Put Correct Marks!");
      state.newQuestion.options.map((option) => {
        if (!option.option_body) throw new Error("All Options Are Required!");
      });
      const res = await postQuestion(id, state.newQuestion);
      await handleGetQuiz(itemId);
      toast.success("Question Created Successfully");
      console.log(res);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const handleDeleteQuestion = async (id, itemId) => {
    try {
      const res = await deleteQuestion(id);
      await handleGetQuiz(itemId);
      toast.warning("Question Deleted Successfully!");
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.log(error);
    }
  };
  const handleGetQuestion = async (id) => {
    try {
      const res = await getQuestion(id);
      dispatch({
        type: Types.GET_QUESTION,
        payload: {
          values: res,
        },
      });
      console.log(res);
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
      handleGetVideo,
      handleUploadVideo,
      handleReplaceVideo,
      handleChangeNewQuestion,
      handleGetQuiz,
      handlePostQuestion,
      handleDeleteQuestion,
      handleGetQuestion,
    }),
    [state],
  );
  console.log(memoizedValue);
  return (
    <CmsContext.Provider value={memoizedValue}>{children}</CmsContext.Provider>
  );
}
