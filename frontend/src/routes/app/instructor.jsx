import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";


// import MainLayout from "../../layout/main";
import AdminLayout from "../../layout/admin";
import { AuthGuard, RoleBasedGuard } from "../../auth/guard";
import { roles } from "../../assets/static.js";

import { SplashScreen } from "../../components";
import { SettingsProvider } from "../../context/settings/settings-provider";

// ----------------------------------------------------------------------

// const InstructorDashboard = lazy(
//   () => import("../../pages/instructor/dashboard/InstructorDashboard"),
// );
const Overview = lazy(
  () => import("../../pages/instructor/dashboard/overview"),
);
const MyStudents = lazy(
  () => import("../../pages/instructor/dashboard/my-students"),
);
const InprogressCourses = lazy(
  () => import("../../pages/instructor/dashboard/inprogress-courses"),
);
const CompletedCourses = lazy(
  () => import("../../pages/instructor/dashboard/completed-courses"),
);
const ShowProfile = lazy(
  () => import("../../pages/instructor/show-profile/ShowProfile"),
);
const General = lazy(
  () => import("../../pages/instructor/settings/general"),
);
const Security = lazy(
  () => import("../../pages/instructor/settings/security"),
);
const Account = lazy(
  () => import("../../pages/instructor/settings/account"),
);
const Curriculum = lazy(
  () => import("../../pages/instructor/cms/curriculum"),
);
// ----------------------------------------------------------------------

const instructors = {
  element: (
    <AuthGuard>
      <RoleBasedGuard roles={roles.instructor}>
        <Suspense fallback={<SplashScreen />}>
          <SettingsProvider>
            <Outlet />
          </SettingsProvider>
        </Suspense>
      </RoleBasedGuard>
    </AuthGuard>
  ),
  children: [
    {
      element: (
        <AdminLayout>
          <Overview />
        </AdminLayout>
      ),
      index: true,
    },
    {
      path: "my-students",
      element: (
        <AdminLayout>
          <MyStudents />
        </AdminLayout>
      ),
    },
    {
      path: "completed-courses",
      element: (
        <AdminLayout>
          <CompletedCourses />
        </AdminLayout>
      ),
    },
    {
      path: "inprogress-courses",
      element: (
        <AdminLayout>
          <InprogressCourses />
        </AdminLayout>
      ),
    },
    {
      path: "settings",
      element: (
        <AdminLayout option="settings">
          <Outlet />
        </AdminLayout>
      ),
      children: [
        {
          path: "general",
          element: <General />,
        },
        {
          path: "security",
          element: <Security />,
        },
        {
          path: "account",
          element: <Account />,
        },
      ],
    },
    {
      path: "course-manage",
      element: (
        <AdminLayout option="courseManage">
          <Outlet />
        </AdminLayout>
      ),
      children: [
        {
          path: "curriculum",
          element: <Curriculum />,
        },
        // {
        //   path: "details",
        //   element: <Security />,
        // },
      ],
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
