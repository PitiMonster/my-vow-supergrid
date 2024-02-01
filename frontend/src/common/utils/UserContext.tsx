import { createContext } from "react";

import { Advertiser, SetState, User } from "common/types";

export const UserContext = createContext<{
  user?: User;
  setUser: SetState<User | undefined>;
  advertiser?: Advertiser;
  setAdvertiser: SetState<Advertiser | undefined>;
}>({
  user: undefined,
  setUser: () => {},
  advertiser: undefined,
  setAdvertiser: () => {},
});
