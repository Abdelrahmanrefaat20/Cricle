import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { authContext } from "../contexts/AuthContext";

export default function MainLayout() {
  const {isLoading} = useContext(authContext)

  return isLoading ? (
    <h1>Loading......</h1>
  ) : (
    <div>
      <Navbar />
      <h1>MainLayout</h1>
      <Outlet />
    </div>
  );
}
