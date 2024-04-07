import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import MainLayout from "../../layout/main";
import { AuthGuard, RoleBasedGuard } from "../../auth/guard";
import { roles } from "../../config-global";

import { SplashScreen } from "../../components";
// ----------------------------------------------------------------------

const StudentDashboard = lazy(() =>
  import("../../pages/student/dashboard/StudentDashboard")
);
const StudentSettings = lazy(() =>
  import("../../pages/student/settings/StudentSettings")
);

// ----------------------------------------------------------------------

const students = {
  path: "students",
  element: (
    <MainLayout>
      <AuthGuard>
        <RoleBasedGuard roles={roles.student}>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </RoleBasedGuard>
      </AuthGuard>
    </MainLayout>
  ),
  children: [
    {
      element: <StudentDashboard />,
      index: true,
    },
    {
      path: "settings",
      element: <StudentSettings />,
    },
  ],
};

export const studentsRoutes = [
  {
    children: [students],
  },
];
