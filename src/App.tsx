import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./contexts/authContext";
import CounterContextProvider from "./contexts/counterContext";
import { router } from "./routes/AppRoutes";

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
