import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectWorkspace from "./pages/ProjectWorkspace";

export const routers = [
    {
      path: "/",
      name: 'home',
      element: <Index />,
    },
    {
      path: "/projects/:projectId",
      name: 'project-detail',
      element: <ProjectDetail />,
    },
    {
      path: "/workspace/:projectId",
      name: 'project-workspace',
      element: <ProjectWorkspace />,
    },
    /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
    {
      path: "*",
      name: '404',
      element: <NotFound />,
    },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
