import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"
import Film from "../pages/Film"
import PublicRoute from "./public_route"
import PrivateRoute from "./private_route"
export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/film",
        element: <Home />
      },
      {
        path: "/film/:id",
        element: <Film />
      },
    ]
  },
  {
    path: "/*",
    element: <NotFound />
  }
])
