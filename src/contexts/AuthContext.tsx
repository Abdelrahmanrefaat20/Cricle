import { createContext, useEffect, useState, type ReactElement } from "react";
import { authServices } from "../services/authService";
export const authContext = createContext<any>({});
export default function AuthContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isLoggedIn, setisLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userData, setuserData] = useState();
  const [isLoading, setisLoading] = useState(true);
  async function getUserData() {
    try {
      const { data } = await authServices.getUserData();
      setuserData(data.user);
      setisLoggedIn(true);
    } catch (error) {
      setisLoggedIn(false);
      localStorage.removeItem("token");
      setisLoading(false);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      setisLoading(false);
    }
  }, []);
  return (
    <authContext.Provider value={{ isLoggedIn, setisLoggedIn, isLoading }}>
      {children}
    </authContext.Provider>
  );
}
