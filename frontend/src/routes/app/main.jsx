import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import MainLayout from "../../layout/main";
// import CompactLayout from "src/layouts/compact";

import { SplashScreen } from "../../components";

// ----------------------------------------------------------------------

export const Home = lazy(() => import("../../pages/shared/Home"));
export const OthersHome = lazy(() => import("../../pages/shared/OthersHome"));
export const Search = lazy(() => import("../../pages/shared/Search"));
const NotFound = lazy(() => import("src/pages/shared/NotFound"));
const NotAuthorized = lazy(() => import("../../pages/shared/NotAuthorized"));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    // children: [
    //   { path: "about-us", element: <AboutPage /> },
    //   {
    //     path: "product",
    //     children: [
    //       { element: <ProductListPage />, index: true },
    //       { path: "list", element: <ProductListPage /> },
    //       { path: ":id", element: <ProductDetailsPage /> },
    //       { path: "checkout", element: <ProductCheckoutPage /> },
    //     ],
    //   },
    // ],
  },
  {
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      { path: "other-users", element: <OthersHome /> },
      {
        path: "search",
        children: [
          { path: "by-topic/:id", element: <Search /> },
          { path: "by-text/:text", element: <Search /> },
        ],
      },
      { path: "404", element: <NotFound /> },
      { path: "403", element: <NotAuthorized /> },
    ],
  },
];
