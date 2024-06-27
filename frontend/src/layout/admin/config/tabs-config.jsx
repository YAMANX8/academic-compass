import { paths } from "../../../routes/paths";
import { useParams } from "../../../routes/hooks";
export const useTabsConfig = () => {
  const { id } = useParams();
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
  const courseMonitorNav = [
    {
      subheader: "course monitor",
      items: [
        {
          title: "course status",
          path: `${paths.course.root}/${id}/${paths.course.monitor.status}`,
          icon: "mdi:information",
        },
        {
          title: "enrollments",
          path: `${paths.course.root}/${id}/${paths.course.monitor.enrollments}`,
          icon: "mdi:account-group-outline",
        },
        {
          title: "reviews",
          path: `${paths.course.root}/${id}/${paths.course.monitor.reviews}`,
          icon: "mdi:comment-multiple-outline",
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
      courseMonitor: courseMonitorNav,
      settings: instructorSettingsNav,
    },
    user: { noOption: test },
  };
};
