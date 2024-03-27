import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { GuestGuard } from "../../auth/guard";
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
        <GuestGuard>
          <MainLayout>
            <CourseDetails />
          </MainLayout>
        </GuestGuard>
      ),
      index: true,
    },
    {
      path: "content",
      children: [
        {
          path: "video/:itemId",
          element: (
            <GuestGuard>
              <MainLayout>
                <Video />
              </MainLayout>
            </GuestGuard>
          ),
        },
        {
          path: "article/:itemId",
          element: (
            <GuestGuard>
              <MainLayout>
                <Article />
              </MainLayout>
            </GuestGuard>
          ),
        },
        {
          path: "quiz/:itemId",
          element: (
            <GuestGuard>
              <MainLayout>
                <Quiz />
              </MainLayout>
            </GuestGuard>
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
        <GuestGuard>
          <MainLayout>
            <EditCourse />
          </MainLayout>
        </GuestGuard>
      ),
    },
    {
      path: "monitor/:id",
      element: (
        <GuestGuard>
          <MainLayout>
            <CourseInfo />
          </MainLayout>
        </GuestGuard>
      ),
    },
    {
      path: "create",
      element: (
        <GuestGuard>
          <MainLayout>
            <CreateCourse />
          </MainLayout>
        </GuestGuard>
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
