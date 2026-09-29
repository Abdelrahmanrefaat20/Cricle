import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/AppRoutes";



function App() {
  return (
    <>
      <HeroUIProvider>
        <RouterProvider router={router}></RouterProvider>
      </HeroUIProvider>
    </>
  );
}

export default App;
