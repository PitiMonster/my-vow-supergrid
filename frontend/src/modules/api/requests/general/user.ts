import { get, patch } from "api";

import { User } from "common/types";

export const updateUser = (payload: Partial<User>) =>
  patch<User, Partial<User>>("/user", payload);

export const getUser = () => get<User, void>("/user");
