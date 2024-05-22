import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

// import MainLayout from "../../layout/main";
import AdminLayout from "../../layout/admin";
import { AuthGuard, RoleBasedGuard } from "../../auth/guard";
import { roles } from "../../config-global";

import { SplashScreen } from "../../components";
// ----------------------------------------------------------------------

// const InstructorDashboard = lazy(
//   () => import("../../pages/instructor/dashboard/InstructorDashboard"),
// );
const Overview = lazy(() => import("../../pages/instructor/dashboard/overview"),);
const MyStudents = lazy(
  () => import("../../pages/instructor/dashboard/my-students"),
);
const InprogressCourses = lazy(
  () => import("../../pages/instructor/dashboard/inprogress-courses"),
);
const CompletedCourses = lazy(
  () => import("../../pages/instructor/dashboard/completed-courses"),
);
const Settings = lazy(() => import("../../pages/instructor/settings/Settings"));
const ShowProfile = lazy(
  () => import("../../pages/instructor/show-profile/ShowProfile"),
);

// ----------------------------------------------------------------------

const instructors = {
  element: (
    <AdminLayout>
      <AuthGuard>
        <RoleBasedGuard roles={roles.instructor}>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </RoleBasedGuard>
      </AuthGuard>
    </AdminLayout>
  ),
  children: [
    {
      element: <Overview />,
      index: true,
    },
    {
      path: "my-students",
      element: <MyStudents />,
    },
    {
      path: "completed-courses",
      element: <CompletedCourses />,
    },
    {
      path: "inprogress-courses",
      element: <InprogressCourses />,
    },
    {
      path: "settings",
      element: <Settings />,
    },
    {
      path: "show-student/:id",
      element: <ShowProfile />,
    },
  ],
};

export const instructorsRoutes = [
  {
    path: "instructors",
    children: [instructors],
  },
];
