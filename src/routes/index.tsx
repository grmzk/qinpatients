import { RouteObject, RouterProvider, createBrowserRouter } from "react-router";

import Header from "../components/header/Header";
import Login from "../components/login/Login";
import Monitor from "../components/monitor/Monitor";
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
          // Routes for authenticated users only
          Component: ProtectedRoute,
          children: [
            {
              index: true,
              Component: Monitor,
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
