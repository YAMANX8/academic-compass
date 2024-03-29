import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { GuestGuard } from "src/auth/guard";
import AuthLayout from "src/layout/auth";

import { SplashScreen } from "src/components";
// ----------------------------------------------------------------------

const LoginStudent = lazy(() =>
  import("../../pages/student/login/LoginStudent")
);
const RegisterStudent = lazy(() =>
  import("../../pages/student/register/RegisterStudent")
);
const LoginInstructor = lazy(() =>
  import("../../pages/instructor/login/LoginInstructor")
);
const RegisterInstructor = lazy(() =>
  import("../../pages/instructor/register/RegisterInstructor")
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
