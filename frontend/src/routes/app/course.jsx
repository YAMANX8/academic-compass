import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import MainLayout from "src/layout/main";
import AdminLayout from "../../layout/admin";
import { AuthGuard, RoleBasedGuard } from "../../auth/guard";
import { roles } from "../../config-global";

import { SplashScreen } from "src/components";
// ----------------------------------------------------------------------

const CourseDetails = lazy(
  () => import("../../pages/student/course-details/CourseDetails"),
);
const Video = lazy(() => import("../../pages/student/video/Video"));
const Article = lazy(() => import("../../pages/student/article/Article"));
const Quiz = lazy(() => import("../../pages/student/quiz/Quiz"));
const Enrollments = lazy(
  () => import("../../pages/instructor/course-info/enrollments"),
);
const Reviews = lazy(
  () => import("../../pages/instructor/course-info/reviews"),
);
const Status = lazy(() => import("../../pages/instructor/course-info/status"));
const CreateCourse = lazy(
  () => import("../../pages/instructor/course-create/CreateCourse"),
);
const Curriculum = lazy(() => import("../../pages/instructor/cms/curriculum"));
const Details = lazy(() => import("../../pages/instructor/cms/details"));
// ----------------------------------------------------------------------

const courseDetails = {
  path: ":id",
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
      element: <CourseDetails />,
      index: true,
    },
    {
      path: "content",
      children: [
        {
          path: "video/:itemId",
          element: <Video />,
        },
        {
          path: "article/:itemId",
          element: <Article />,
        },
        {
          path: "quiz/:itemId",
          element: <Quiz />,
        },
      ],
    },
  ],
};

const courseManagement = {
  element: (
    <AuthGuard>
      <RoleBasedGuard roles={roles.instructor}>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </RoleBasedGuard>
    </AuthGuard>
  ),
  children: [
    {
      path: ":id/manage",
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
        {
          path: "details",
          element: <Details />,
        },
      ],
    },
    {
      path: ":id/monitor",
      element: (
        <AdminLayout option="courseMonitor">
          <Outlet />
        </AdminLayout>
      ),
      children: [
        {
          path: "status",
          element: <Status />,
        },
        {
          path: "enrollments",
          element: <Enrollments />,
        },
        {
          path: "reviews",
          element: <Reviews />,
        },
      ],
    },
    {
      path: "create",
      element: (
        <AdminLayout option="noNav">
          <CreateCourse />
        </AdminLayout>
      ),
    },
  ],
};

export const coursesRoutes = [
  {
    path: "course",
    children: [courseDetails, courseManagement],
  },
];
