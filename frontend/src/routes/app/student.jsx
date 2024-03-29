import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import MainLayout from "../../layout/main";

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
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      element: (
        
          <MainLayout>
            <StudentDashboard />
          </MainLayout>
        
      ),
      index: true,
    },
    {
      path: "settings",
      element: (
        
          <MainLayout>
            <StudentSettings />
          </MainLayout>
        
      ),
    },
  ],
};

export const studentsRoutes = [
  {
    children: [students],
  },
];
