import { RouteObject, RouterProvider, createBrowserRouter } from "react-router";

import Header from "../components/header/Header";
import Login from "../components/login/Login";
import Monitor from "../components/monitor/Monitor";
import NotFound from "../components/notfound/NotFound";
import Patient from "../components/patient/Patient";
import Search from "../components/search/Search";
import ProtectedRoute from "./ProtectedRoute";

function AuthRoutes() {
  const routes: RouteObject[] = [
    {
      // Public routes
      path: "/",
      Component: Header,
      children: [
        {
          path: "login",
          Component: Login,
        },
        {
          path: "notfound",
          Component: NotFound,
        },
        {
          path: "*",
          Component: NotFound,
        },
        {
          // Routes for authenticated users only
          Component: ProtectedRoute,
          children: [
            {
              index: true,
              Component: Monitor,
            },
            {
              path: "patients",
              children: [
                {
                  path: ":patientId",
                  Component: Patient,
                },
              ],
            },
            {
              path: "search",
              Component: Search,
            },
          ],
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default AuthRoutes;
