import { DashboardPage } from "../pages/Dashboard/DashboardPage";


export const RouterProvider = () => {
  return [
    { path: "/", element: <DashboardPage /> },
  ];
};
