import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

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
          <MainLayout>
            <InstructorDashboard />
          </MainLayout>
      ),
      index: true,
    },
    {
      path: "settings",
      element: (
        
          <MainLayout>
            <Settings />
          </MainLayout>
        
      ),
    },
    {
      path: "show-student/:id",
      element: (
        
          <MainLayout>
            <ShowProfile />
          </MainLayout>
        
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
