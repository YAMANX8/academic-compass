import axios from "axios";

import { ACADEMIC_COMPASS_HOST_API } from "src/config-global";

const axiosInstance = axios.create({
  baseURL: ACADEMIC_COMPASS_HOST_API,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong",
    ),
);

export const axiosPrivate = axios.create({
  baseURL: ACADEMIC_COMPASS_HOST_API,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axiosInstance;

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export const endpoints = {
  home: "/home",
  student: {
    auth: {
      me: "/auth/me",
      login: "/auth/student/login",
      register: "/auth/student/register",
    },
    dashboard: "/studentDashboard",
    // This endpoint has get and put methods
    settings: "/student/setting",
  },
  logout: "/logout",
  instructor: {
    auth: {
      me: "/auth2/instructor/me",
      login: "/auth2/instructor/login",
      register: "/auth2/instructor/register",
    },
    dashboard: {
      overview: "/instructor/dashboard/overview",
      inProgressCourses: "/instructor/dashboard/in-progress-courses",
      completedCourses: "/instructor/dashboard/completed-courses",
    },
    settings: "/instructor/setting",
    getStudent: "/instructor/studentProfile", // not used yet!
  },
  course: {
    details: "/course",
    enroll: "/course/enroll",
    article: {
      get: "/article",
      complete: "/article/Completed",
    },
    video: {
      get: "/video",
      complete: "/video/Completed",
    },
    review: {
      get: "/review/show_review",
      post: "/review/edit_review",
      delete: "/review/delete_review",
    },
    // This endpoint has get and post methods.
    create: "/instructor/createCourse",
    manage: {
      // This endpoint has get and put methods.
      info: "/instructor/editeCourseInfo",
      curriculum: {
        index: "/instructor/content_management_system/curriculum", // This endpoint needs /:courseId
        getTopicsL1:
          "/instructor/content_management_system/curriculum/assigning-topics",
        getTopicsL2:
          "/instructor/content_management_system/curriculum/new-item/TL2", // This endpoint needs /:topicId
        getTopicsLn:
          "/instructor/content_management_system/curriculum/new-item/TL3", // This endpoint needs /:topicId
        newItem: "/instructor/content_management_system/curriculum/new-item", // This endpoint needs /:courseId
        deleteItem: "/instructor/content_management_system/curriculum/item", // This endpoint needs /:itemId
        uploadVideo: "/instructor/content_management_system/curriculum/video", // This endpoint needs /:itemId
        getVideo: "/instructor/content_management_system/curriculum/video", // This endpoint needs /:itemId
        getQuestions:
          "/instructor/content_management_system/curriculum/questions", // This endpoint needs /:itemId
        postQuestion:
          "/instructor/content_management_system/curriculum/question", // This endpoint needs /:quizId
        deleteQuestion:
          "/instructor/content_management_system/curriculum/question", // This endpoint needs /:questionId
        getQuestion: "/instructor/content_management_system/curriculum/options", // This endpoint needs /:questionId
        getArticle: "/instructor/content_management_system/curriculum/article", // This endpoint needs /:item_id
        putArticle: "/instructor/content_management_system/curriculum/article", // This endpoint needs /:item_id
      },
    },
  },
  roadmaps: {
    getAll: "/roadmap",
    addRoadmap: "/addroadmap", // not used yet!
    topics: {
      levelZero: {
        // This endpoint needs /:id
        user: "/roadmap",
        // This endpoint needs /:id
        student: "/roadmap/student",
      },
      levelOne: {
        // This endpoint needs /:id
        user: "/roadmap/topic",
        // This endpoint needs /:id
        student: "/roadmap/student/topic",
      },
      levelN: {
        // This endpoint needs /:id
        user: "/roadmap/topicN",
        // This endpoint needs /:id
        student: "/roadmap/student/topicN",
      },
      newState: "/roadmap/student/state",
      // This endpoint needs /:topicId/:level
      resetState: "/roadmap/student/reset",
    },
  },
};
