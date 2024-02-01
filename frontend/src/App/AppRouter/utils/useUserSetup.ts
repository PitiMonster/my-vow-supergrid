/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";

import { getUserFromCache } from "common/utils";
import { UserContext } from "common/utils/UserContext";

export const useUserSetup = () => {
  // Should be invoked only once in the app

  const queryClient = useQueryClient();
  const { user, setUser } = useContext(UserContext);
  const cachedUser = getUserFromCache();

  if (JSON.stringify(cachedUser) !== JSON.stringify(user)) {
    if (cachedUser) setUser(cachedUser);
  }

  useEffect(() => {
    document.addEventListener("VOW:logout", () => {
      setUser(undefined);
      queryClient.clear();
    });
  }, []);
};
