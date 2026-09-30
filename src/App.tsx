import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/AppRoutes";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import CounterContextProvider from "./contexts/counterContext";
import AuthContextProvider from "./contexts/authContext";

function App() {
  return (
    <>
    <AuthContextProvider>
      <CounterContextProvider>
        <HeroUIProvider>
          <RouterProvider router={router}></RouterProvider>
        </HeroUIProvider>
      </CounterContextProvider>
    </AuthContextProvider>
    </>
  );
}

export default App;
