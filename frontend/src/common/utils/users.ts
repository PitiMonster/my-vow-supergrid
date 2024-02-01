import { ContextUser } from "common/types";

const USER_STORAGE_KEY = "user";

export const getUserFromCache = (): ContextUser | null => {
  const cachedData = localStorage.getItem(USER_STORAGE_KEY);
  if (cachedData) {
    try {
      return JSON.parse(cachedData);
    } catch (SyntaxError) {
      return null;
    }
  }
  return null;
};

export const setUserToCache = (user: ContextUser | null) => {
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
};
