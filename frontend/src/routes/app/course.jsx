import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import MainLayout from "src/layout/main";

import { SplashScreen } from "src/components";
// ----------------------------------------------------------------------

const CourseDetails = lazy(() =>
  import("../../pages/student/course-details/CourseDetails")
);
const Video = lazy(() =>
  import("../../pages/student/video/Video")
);
const Article = lazy(() =>
  import("../../pages/student/article/Article")
);
const Quiz = lazy(() =>
  import("../../pages/student/quiz/Quiz")
);
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
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      element: (
          <MainLayout>
            <CourseDetails />
          </MainLayout>
      ),
      index: true,
    },
    {
      path: "content",
      children: [
        {
          path: "video/:itemId",
          element: (
              <MainLayout>
                <Video />
              </MainLayout>
          ),
        },
        {
          path: "article/:itemId",
          element: (
              <MainLayout>
                <Article />
              </MainLayout>
          ),
        },
        {
          path: "quiz/:itemId",
          element: (
              <MainLayout>
                <Quiz />
              </MainLayout>
          ),
        },
      ],
    },
  ],
};

const courseManagement = {
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: "edit/:id",
      element: (
          <MainLayout>
            <EditCourse />
          </MainLayout>
      ),
    },
    {
      path: "monitor/:id",
      element: (
          <MainLayout>
            <CourseInfo />
          </MainLayout>
      ),
    },
    {
      path: "create",
      element: (
          <MainLayout>
            <CreateCourse />
          </MainLayout>
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
