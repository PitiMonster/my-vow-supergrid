import * as routes from "../routes";

export const getNearIndexRoute = (path: string) => {
  if (!path.startsWith("/")) {
    throw Error("Path must starts with '/'");
  }
  const [, root] = path.split("/", 2);
  let matchingRoute = "";

  switch (`/${root}`) {
    case routes.STRATEGY_ROOT: {
      routes.strategyIndexRoutes.forEach((indexRoute) => {
        if (path.startsWith(indexRoute)) {
          matchingRoute = indexRoute;
          return;
        }
      });
      break;
    }

    default: {
      throw Error(
        `Seems '${path}' doesn't match any route that might include index page.`
      );
    }
  }
  return matchingRoute;
};
