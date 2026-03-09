import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <main className="">
     
      <RouterProvider router={router} />
    </main>
  </React.StrictMode>,
);
