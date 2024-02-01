import "@aleph/supergrid/style.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApiProvider } from "api";
import { useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { Advertiser, User } from "common/types";
import { UserContext } from "common/utils/UserContext";

import { AppRouter } from "./App/AppRouter/AppRouter";

export const App = () => {
  const [user, setUser] = useState<User | undefined>();
  const [advertiser, setAdvertiser] = useState<Advertiser | undefined>();

  const userContextValue = useMemo(
    () => ({ user, setUser, advertiser, setAdvertiser }),
    [user, advertiser]
  );

  return (
    <BrowserRouter>
      <ApiProvider>
        <UserContext.Provider value={userContextValue}>
          <AppRouter />
          <ReactQueryDevtools />
        </UserContext.Provider>
      </ApiProvider>
    </BrowserRouter>
  );
};
