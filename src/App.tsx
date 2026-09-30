import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/AppRoutes";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import CounterContextProvider from "./contexts/CounterContext";
import AuthContextProvider from "./contexts/AuthContext";

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
