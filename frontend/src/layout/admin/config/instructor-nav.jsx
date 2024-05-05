import { paths } from "../../../routes/paths";

export const useInstructorNav = () => {
  const data = [
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
          path: paths.instructor.root,
          icon: "mdi:account-school",
        },
      ],
    },
    {
      subheader: "my courses",
      items: [
        {
          title: "completed courses",
          path: paths.instructor.root,
          icon: "mdi:presentation-play",
        },
        {
          title: "inprogress courses",
          path: paths.instructor.root,
          icon: "mdi:page-next-outline",
        },
      ],
    },
  ]

  return data;
};
