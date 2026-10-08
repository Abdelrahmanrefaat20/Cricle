import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./contexts/AuthContext";
import CounterContextProvider from "./contexts/CounterContext";
import { router } from "./routes/AppRoutes";
export const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CounterContextProvider>
            <HeroUIProvider>
              <RouterProvider router={router}></RouterProvider>
            </HeroUIProvider>
          </CounterContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
