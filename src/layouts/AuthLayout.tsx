import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import LoadingScreen from "../components/LoadingScreen";

export default function AuthLayout() {
  const { isLoading } = useContext(authContext);

  return isLoading ? <LoadingScreen /> : <Outlet />;
}
