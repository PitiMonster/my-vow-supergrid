import { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { UserContext } from "common/utils";
import { LoginPage } from "pages/LoginPage";

import { PrivateRoutes } from "./components";
import * as routes from "./routes";
import { useUserSetup, useAdvertiserSetup } from "./utils";

export const PublicRoutes = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route
        path={routes.DEFAULT}
        element={<Navigate replace to={routes.LOGIN} />}
      />
      <Route path={routes.LOGIN} element={<LoginPage />} />

      <Route
        path={routes.ANY_OTHER}
        element={
          <Navigate
            replace
            to={routes.DEFAULT}
            state={{
              from: { pathname: location.pathname, search: location.search },
            }}
          />
        }
      />
    </Routes>
  );
};

export const AppRouter = () => {
  useUserSetup();
  useAdvertiserSetup();

  const { user } = useContext(UserContext);

  if (!user)
    return (
      <div>
        <PublicRoutes />
      </div>
    );

  return (
    <div>
      <PrivateRoutes />
    </div>
  );
};
