import type { JSX } from "react";
import { Login } from "../components/Login";
import { Home } from "../views/Home";
import Layout from "../views/Layout";
import { EntryRedirect } from "../views/EntryRedirect";
import { ExcelPage } from "../views/Excel";
import { Calender } from "../views/calender";

export interface Page {
  path: string;
  element: JSX.Element;
  name: string;
  isShown: boolean;
}

export const routes: Page[] = [
  {
    path: "/home",
    element: <Home />,
    name: "בית",
    isShown: true,
  },
  {
    path: "/login",
    element: <Login />,
    name: "התחברות",
    isShown: true,
  },
  {
    path: "/excel",
    element: <ExcelPage />,
    name: "אקסל",
    isShown: true,
  },
   {
    path: "/calender",
    element: <Calender />,
    name: "מערכת שעות",
    isShown: true,
  },
];

export const paths = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <EntryRedirect /> },
      ...routes.map((route) => ({
        path: route.path,
        element: route.element,
      })),
    ],
  },
];
