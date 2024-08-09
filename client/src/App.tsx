import "./App.css";
import { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { routesList } from "./router";
import Page from "./components/Page";
import FirstPage from "./components/mainPage/firstPage/FirstPage";
import NotFound from "./components/ui/notFound/NotFound";
import AdminPanel from "./components/mainPage/adminPanel/AdminPanel";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useAppDispatches, useAppSelector } from "./hooks/redux";

function App() {
  const { isLoading } = useAppSelector((state) => state.auth);
  const { checkAuth } = useAppDispatches();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("1");
      checkAuth();
    }
  }, []);
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "30px",
        }}
      >
        Загрузка....
      </div>
    );
  }
  return (
    <>
      <ChakraProvider resetCSS={false}>
        <Routes>
          <Route element={<PrivateRoute role="admin" />}>
            <Route path="adminPanel" element={<AdminPanel />} />
          </Route>
          <Route path="/" element={<Page />}>
            <Route index element={<FirstPage />} />
            {routesList.map((route) => (
              <Route
                path={route.path}
                element={route.element}
                key={route.path}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </ChakraProvider>
    </>
  );
}

export default App;
