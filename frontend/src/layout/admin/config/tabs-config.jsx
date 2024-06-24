import { paths } from "../../../routes/paths";

export const useTabsConfig = () => {
  const instructorNav = [
    {
      subheader: "dashboard",
      items: [
        {
          title: "overview",
          path: paths.instructor.root,
          icon: "mdi:view-dashboard",
        },
        {
          title: "my students",
          path: paths.instructor.myStudents,
          icon: "mdi:account-school",
        },
      ],
    },
    {
      subheader: "my courses",
      items: [
        {
          title: "completed courses",
          path: paths.instructor.completedCourses,
          icon: "mdi:presentation-play",
        },
        {
          title: "inprogress courses",
          path: paths.instructor.inprogressCourses,
          icon: "mdi:page-next-outline",
        },
      ],
    },
  ];
  const courseManageNav = [
    {
      subheader: "course management",
      items: [
        {
          title: "curriculum",
          path: paths.instructor.root,
          icon: "mdi:book-open",
        },
        {
          title: "details",
          path: paths.instructor.root,
          icon: "mdi:information",
        },
      ],
    },
  ];
  const supervisorNav = [
    {
      subheader: "dashboard",
      items: [
        {
          title: "",
          path: "",
          icon: "",
        },
      ],
    },
  ];
  const academicManagerNav = [
    {
      subheader: "dashboard",
      items: [
        {
          title: "",
          path: "",
          icon: "",
        },
      ],
    },
  ];
  const managerNav = [
    {
      subheader: "dashboard",
      items: [
        {
          title: "",
          path: "",
          icon: "",
        },
      ],
    },
  ];
  const instructorSettingsNav = [
    {
      subheader: "settings",
      items: [
        {
          title: "general info",
          path: paths.instructor.settings.general,
          icon: "mdi:information",
        },
        {
          title: "security",
          path: paths.instructor.settings.security,
          icon: "mdi:security",
        },
        {
          title: "account",
          path: paths.instructor.settings.account,
          icon: "mdi:account",
        },
      ],
    },
  ];
  const test = [
    {
      subheader: "test",
      items: [
        {
          title: "test",
          path: paths.main.root,
          icon: "mdi:book-open",
        },
      ],
    },
  ];

  return {
    instructor: {
      noOption: instructorNav,
      courseManage: courseManageNav,
      settings: instructorSettingsNav,
    },
    user: { noOption: test },
  };
};
