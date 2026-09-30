import { createHashRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import MainLayout from "../layouts/MainLayout";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../protectedRoutes/ProtectedRoute";
import ProtectedAuthRoute from "../protectedRoutes/ProtectedAuthRoute";

export const router = createHashRouter([
  {
    path: "",
    element: <AuthLayout />,
    children: [
      { path: "signup", element: <ProtectedAuthRoute><SignUp /></ProtectedAuthRoute> },
      { path: "signin", element: <ProtectedAuthRoute><SignIn /></ProtectedAuthRoute> },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
            <NotFound />
        ),
      },
    ],
  },
]);
