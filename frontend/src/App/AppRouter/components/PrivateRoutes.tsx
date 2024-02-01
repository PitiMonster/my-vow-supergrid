import {
  StrategiesPage,
  AdvertisersPage,
  SingleStrategyPage,
  SingleCampaignPage,
  MenuPage,
  LogoutPage,
} from "pages";
import { Navigate, Route, Routes } from "react-router-dom";

import { BaseSupergrid } from "pages/BaseSupergrid";

import { redirectToDefaultPath } from "./utils";
import * as routes from "../routes";

export const PrivateRoutes = () => {
  const defaultRoute = routes.MENU;

  return (
    <Routes>
      <Route path={routes.DEFAULT}>
        {redirectToDefaultPath(defaultRoute)}
        <Route path={routes.MENU} element={<MenuPage />} />
        <Route path={routes.SUPERGRID_EXAMPLE} element={<BaseSupergrid />} />
        {/* STRATEGIES */}
        <Route path={routes.STRATEGY_ROOT}>
          <Route index element={<StrategiesPage />} />
          <Route path={routes.STRATEGY_DETAIL} element={<SingleStrategyPage />}>
            {redirectToDefaultPath(routes.STRATEGY_DETAIL_OVERVIEW)}
            <Route path={routes.STRATEGY_DETAIL_OVERVIEW}>
              <Route
                index
                path={routes.STRATEGY_DETAIL_CAMPAIGNS}
                element={<SingleCampaignPage />}
              />
            </Route>
          </Route>
        </Route>

        <Route path={routes.ADMIN_ROOT}>
          {redirectToDefaultPath(routes.ADMIN_ADVERTISER_INDEX)}
          <Route path={routes.ADMIN_ADVERTISER_INDEX}>
            <Route index element={<AdvertisersPage />} />
          </Route>
        </Route>

        <Route
          path={routes.LOGIN}
          element={<Navigate replace to={routes.DEFAULT} />}
        />
        <Route path={routes.LOGOUT} element={<LogoutPage />} />
      </Route>
    </Routes>
  );
};
