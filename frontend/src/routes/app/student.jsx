import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { GuestGuard } from "../../auth/guard";
import MainLayout from "../../layout/main";

import { SplashScreen } from "../../components";
// ----------------------------------------------------------------------

const StudentDashboard = lazy(() =>
  import("../../pages/student interfaces/StudentDashboard")
);
const StudentSettings = lazy(() =>
  import("../../pages/student interfaces/StudentSettings")
);

// ----------------------------------------------------------------------

const students = {
  path: "students",
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      element: (
        <GuestGuard>
          <MainLayout>
            <StudentDashboard />
          </MainLayout>
        </GuestGuard>
      ),
      index: true,
    },
    {
      path: "settings",
      element: (
        <GuestGuard>
          <MainLayout>
            <StudentSettings />
          </MainLayout>
        </GuestGuard>
      ),
    },
  ],
};

export const studentsRoutes = [
  {
    children: [students],
  },
];
