import { createHashRouter } from "react-router-dom";
import AuthLayout from '../layouts/AuthLayout';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import MainLayout from '../layouts/MainLayout';
import Feed from '../pages/Feed';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

export const router = createHashRouter([
  {
    path: "",
    element: <AuthLayout />,
    children: [
      { path: "signup", element: <SignUp /> },
      { path: "signin", element: <SignIn /> },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    children: [
      { index: true, element: <Feed /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);