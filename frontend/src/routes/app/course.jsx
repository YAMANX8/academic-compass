import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import MainLayout from "src/layout/main";
import { AuthGuard, RoleBasedGuard } from "../../auth/guard";
import { roles } from "../../config-global";

import { SplashScreen } from "src/components";
// ----------------------------------------------------------------------

const CourseDetails = lazy(() =>
  import("../../pages/student/course-details/CourseDetails")
);
const Video = lazy(() => import("../../pages/student/video/Video"));
const Article = lazy(() => import("../../pages/student/article/Article"));
const Quiz = lazy(() => import("../../pages/student/quiz/Quiz"));
const CourseInfo = lazy(() =>
  import("../../pages/instructor/course-info/CourseInfo")
);
const CreateCourse = lazy(() =>
  import("../../pages/instructor/course-create/CreateCourse")
);
const EditCourse = lazy(() =>
  import("../../pages/instructor/course-edit/EditCourse")
);

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
      path: "edit/:id",
      element: <EditCourse />,
    },
    {
      path: "monitor/:id",
      element: <CourseInfo />,
    },
    {
      path: "create",
      element: <CreateCourse />,
    },
  ],
};

export const coursesRoutes = [
  {
    path: "course",
    children: [courseDetails, courseManagement],
  },
];
