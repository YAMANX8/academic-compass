import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import MainLayout from "../../layout/main";
import RoadmapLayout from "../../layout/roadmap";

import { SplashScreen } from "../../components";
// ----------------------------------------------------------------------

const Roadmaps = lazy(() => import("../../pages/shared/Roadmaps"));
const LevelZero = lazy(() =>
  import("../../pages/shared/roadmap pages/LevelZero")
);
const LevelOne = lazy(() =>
  import("../../pages/shared/roadmap pages/LevelOne")
);
const LevelN = lazy(() => import("../../pages/shared/roadmap pages/LevelN"));

// ----------------------------------------------------------------------

const roadmaps = {
  path: "roadmaps",
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      element: (
        <MainLayout>
          <Roadmaps />
        </MainLayout>
      ),
      index: true,
    },
    {
      path: ":roadmapId",
      element: (
        <RoadmapLayout>
          <Outlet />
        </RoadmapLayout>
      ),
      children: [
        {
          element: <LevelZero />,
          index: true,
        },
        {
          path: ":topicL1Id",
          element: <Outlet />,
          children: [
            {
              element: <LevelOne />,
              index: true,
            },
            {
              path: ":topicLnId",
              element: <LevelN />,
            },
          ],
        },
      ],
    },
  ],
};

export const roadmapsRoutes = [
  {
    children: [roadmaps],
  },
];
