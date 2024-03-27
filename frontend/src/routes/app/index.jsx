import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import MainLayout from "../../layout/main";

// import { PATH_AFTER_LOGIN } from 'src/config-global';
import { authRoutes } from "./auth";
import { mainRoutes } from "./main";
import { roadmapsRoutes } from "./roadmap";
import { coursesRoutes } from "./course";
import { studentsRoutes } from "./student";
import { instructorsRoutes } from "./instructor";
import { Home } from "../../pages";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    // {
    //   path: '/',
    //   element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    // },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    {
      path: "/",
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      ),
    },
    ...instructorsRoutes,
    ...studentsRoutes,
    ...coursesRoutes,
    ...roadmapsRoutes,
    ...authRoutes,
    ...mainRoutes,
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
