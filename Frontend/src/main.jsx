import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Routes/ErrorPage";
import Access from "./Routes/Access";
import Home from "./Routes/Home";
import SignUp from "./Routes/SignUp";
import Profile from "./Components/Profile";
import App from "./App";

// Cria uma instância do roteador de navegaçâo usando o createBrowser Router.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Access />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
]);
// Renderiza a raiz do aplicativo com o roteador de navegação.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
