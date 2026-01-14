import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectWorkspace from "./pages/ProjectWorkspace";
import Auth from "./pages/Auth";
import { RootLayout } from "./components/layout/RootLayout";

export const routers = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "project/:projectId",
        element: <ProjectDetail />,
      },
      {
        path: "project/:projectId/workspace",
        element: <ProjectWorkspace />,
      },
    ],
  },
  /* Catch-all route for 404 */
  {
    path: "*",
    element: <NotFound />,
  },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
