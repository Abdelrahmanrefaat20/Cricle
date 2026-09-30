import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { authContext } from "../contexts/authContext";

export default function AuthLayout() {
  const { isLoading } = useContext(authContext);

  return isLoading ? <h1>Loading</h1> : <Outlet />;
}
