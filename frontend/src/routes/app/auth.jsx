import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { GuestGuard } from "../../auth/guard";
import AuthLayout from "../../layout/auth";

import { SplashScreen } from "../../components";
// ----------------------------------------------------------------------

const LoginStudent = lazy(() =>
  import("../../pages/student interfaces/LoginStudent")
);
const RegisterStudent = lazy(() =>
  import("../../pages/student interfaces/RegisterStudent")
);
const LoginInstructor = lazy(() =>
  import("../../pages/instructor interfaces/LoginInstructor")
);
const RegisterInstructor = lazy(() =>
  import("../../pages/instructor interfaces/RegisterInstructor")
);

// ----------------------------------------------------------------------

const studentAuth = {
  path: "student",
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: "login",
      element: (
        <GuestGuard>
          <AuthLayout
            subtitle="Chart Your Learning Journey with Interactive Educational Roadmaps"
            title="LOGIN"
          >
            <LoginStudent />
          </AuthLayout>
        </GuestGuard>
      ),
    },
    {
      path: "register",
      element: (
        <GuestGuard>
          <AuthLayout
            subtitle="Chart Your Learning Journey with Interactive Educational Roadmaps"
            title="SIGN UP"
          >
            <RegisterStudent />
          </AuthLayout>
        </GuestGuard>
      ),
    },
  ],
};
const instructorAuth = {
  path: "instructor",
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: "login",
      element: (
        <GuestGuard>
          <AuthLayout
            subtitle="Chart Your Learning Journey with Interactive Educational Roadmaps"
            title="LOGIN"
          >
            <LoginInstructor />
          </AuthLayout>
        </GuestGuard>
      ),
    },
    {
      path: "register",
      element: (
        <GuestGuard>
          <AuthLayout
            subtitle="Chart Your Learning Journey with Interactive Educational Roadmaps"
            title="SIGN UP"
          >
            <RegisterInstructor />
          </AuthLayout>
        </GuestGuard>
      ),
    },
  ],
};

export const authRoutes = [
  {
    path: "auth",
    children: [studentAuth, instructorAuth],
  },
];
