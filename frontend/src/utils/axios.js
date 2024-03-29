import axios from "axios";

import { ACADEMIC_COMPASS_HOST_API } from "src/config-global";

const axiosInstance = axios.create({ baseURL: ACADEMIC_COMPASS_HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

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
  instructor: {
    auth: {
      me: "/auth2/instructor/me",
      login: "/auth2/instructor/login",
      register: "/auth2/instructor/register",
    },
    dashboard: "/instructor/dashboard",
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
    edit: {
      // This endpoint has get and put methods.
      info: "/instructor/editeCourseInfo",
      curriculum: "", // not used yet!
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
      addState: "/roadmap/addState/student/state",
      // This endpoint needs /:topicId/:level
      resetState: "/roadmap/addState/student/reset",
    },
  },
};
