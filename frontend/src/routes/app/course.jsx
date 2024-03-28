import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import MainLayout from "../../layout/main";

import { SplashScreen } from "../../components";
// ----------------------------------------------------------------------

const CourseDetails = lazy(() =>
  import("../../pages/student interfaces/CourseDetails")
);
const Video = lazy(() =>
  import("../../pages/student interfaces/course content pages/Video")
);
const Article = lazy(() =>
  import("../../pages/student interfaces/course content pages/Article")
);
const Quiz = lazy(() =>
  import("../../pages/student interfaces/course content pages/Quiz")
);
const CourseInfo = lazy(() =>
  import("../../pages/instructor interfaces/CourseInfo")
);
const CreateCourse = lazy(() =>
  import("../../pages/instructor interfaces/CreateCourse")
);
const EditCourse = lazy(() =>
  import("../../pages/instructor interfaces/EditCourse")
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
