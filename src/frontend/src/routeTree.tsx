import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import ComposePage from "./pages/ComposePage";
import LandingPage from "./pages/LandingPage";
import ReadPage from "./pages/ReadPage";
import UnlockPage from "./pages/UnlockPage";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const composeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compose",
  component: ComposePage,
});

const unlockRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/open",
  component: UnlockPage,
});

const readRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/read/$id",
  component: ReadPage,
});

export const routeTree = rootRoute.addChildren([
  landingRoute,
  composeRoute,
  unlockRoute,
  readRoute,
]);
