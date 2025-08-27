import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Servicios from "./pages/servicios";
import ServicioDetalle from "./pages/ServicioDetalle";
import Nosotros from "./pages/nosotros";
import Contacto from "./pages/contacto";
import NotFound from "./pages/NotFound";
import App from './App'
import "./index.css";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/servicios", element: <Servicios /> },
      { path: "/servicios/:id", element: <ServicioDetalle /> },
      { path: "/nosotros", element: <Nosotros /> },
      { path: "/contacto", element: <Contacto /> },
      { path: "*", element: <NotFound /> },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

