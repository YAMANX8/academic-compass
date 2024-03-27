import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { GuestGuard } from "../../auth/guard";
import MainLayout from "../../layout/main";

import { SplashScreen } from "../../components";
// ----------------------------------------------------------------------

const InstructorDashboard = lazy(() =>
  import("../../pages/instructor interfaces/InstructorDashboard")
);
const Settings = lazy(() =>
  import("../../pages/instructor interfaces/Settings")
);
const ShowProfile = lazy(() =>
  import("../../pages/instructor interfaces/ShowProfile")
);

// ----------------------------------------------------------------------

const instructors = {
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
            <InstructorDashboard />
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
            <Settings />
          </MainLayout>
        </GuestGuard>
      ),
    },
    {
      path: "show-student/:id",
      element: (
        <GuestGuard>
          <MainLayout>
            <ShowProfile />
          </MainLayout>
        </GuestGuard>
      ),
    },
  ],
};

export const instructorsRoutes = [
  {
    path: "instructors",
    children: [instructors],
  },
];
