export const ROOTS = {
  AUTH: "/auth",
  STUDENT_DASHBOARD: "/students",
  INSTRUCTOR_DASHBOARD: "/instructors",
  SUPERVISOR_DASHBOARD: "/supervisors",
  MANAGER_DASHBOARD: "/managers",
};

// ----------------------------------------------------------------------

export const paths = {
  auth: {
    student: {
      login: `${ROOTS.AUTH}/student/login`,
      register: `${ROOTS.AUTH}/student/register`,
    },
    instructor: {
      login: `${ROOTS.AUTH}/instructor/login`,
      register: `${ROOTS.AUTH}/instructor/register`,
    },
  },
  main: {
    root: "/",
    others: "/other-users",
    search: {
      byTopic: "/search/by-topic",
      byText: "/search/by-text",
    },
  },
  course: {
    details: "/course",
    content: {
      video: "content/video",
      article: "content/article",
      quiz: "content/quiz",
    },
    manage: {
      create: "/course/create",
      edit: "/course/edit",
      monitor: "/course/monitor",
    },
  },
  student: {
    root: ROOTS.STUDENT_DASHBOARD,
    settings: `${ROOTS.STUDENT_DASHBOARD}/settings`,
  },
  instructor: {
    root: ROOTS.INSTRUCTOR_DASHBOARD,
    myStudents: `${ROOTS.INSTRUCTOR_DASHBOARD}/my-students`,
    completedCourses: `${ROOTS.INSTRUCTOR_DASHBOARD}/completed-courses`,
    inprogressCourses: `${ROOTS.INSTRUCTOR_DASHBOARD}/inprogress-courses`,
    settings: {
      general: `${ROOTS.INSTRUCTOR_DASHBOARD}/settings/general`,
      security: `${ROOTS.INSTRUCTOR_DASHBOARD}/settings/security`,
      account: `${ROOTS.INSTRUCTOR_DASHBOARD}/settings/account`,
    },
    show: { student: `${ROOTS.INSTRUCTOR_DASHBOARD}/show-student` },
  },
  supervisor: {
    root: ROOTS.SUPERVISOR_DASHBOARD,
    settings: `${ROOTS.SUPERVISOR_DASHBOARD}/settings`,
  },
  manager: {
    root: ROOTS.MANAGER_DASHBOARD,
    settings: `${ROOTS.MANAGER_DASHBOARD}/settings`,
  },
  roadmaps: "/roadmaps",
};
