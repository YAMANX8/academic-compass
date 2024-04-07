import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import MainLayout from "../../layout/main";
import { AuthGuard, RoleBasedGuard } from "../../auth/guard";
import { roles } from "../../config-global";

import { SplashScreen } from "../../components";
// ----------------------------------------------------------------------

const InstructorDashboard = lazy(() =>
  import("../../pages/instructor/dashboard/InstructorDashboard")
);
const Settings = lazy(() => import("../../pages/instructor/settings/Settings"));
const ShowProfile = lazy(() =>
  import("../../pages/instructor/show-profile/ShowProfile")
);

// ----------------------------------------------------------------------

const instructors = {
  element: (
    <MainLayout>
      <AuthGuard>
        <RoleBasedGuard roles={roles.instructor}>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </RoleBasedGuard>
      </AuthGuard>
    </MainLayout>
  ),
  children: [
    {
      element: <InstructorDashboard />,
      index: true,
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
