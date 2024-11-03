import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
export const router = createBrowserRouter([
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
  }
])
