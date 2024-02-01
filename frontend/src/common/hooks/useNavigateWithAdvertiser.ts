import { useCallback } from "react";
import {
  useNavigate,
  NavigateFunction,
  To,
  NavigateOptions,
} from "react-router-dom";

import { getAdvertiserId } from "common/utils";

/**
 * Merges given search query with advertiser ID.
 */
const mergeSearchParams = (search?: string) => {
  const advertiserId = getAdvertiserId({ silentError: true });
  if (!search) return `?aid=${advertiserId}`;

  const newSearchObj = {
    aid: advertiserId,
    ...Object.fromEntries(new URLSearchParams(search)),
  };
  const mergedSearchParams = new URLSearchParams();
  Object.entries(newSearchObj).forEach(
    ([key, value]) => value && mergedSearchParams.append(key, value.toString())
  );
  return `?${mergedSearchParams}`;
};

/**
 * Returns an imperative method for changing the location
 * from the react-router-dom, extended with advertiser ID.
 */
export const useNavigateWithAdvertiser = (): NavigateFunction => {
  const navigate = useNavigate();

  const navigateWithAdvertiser = useCallback(
    (to: To | number, options?: NavigateOptions) => {
      const nav = (to: To | number, options?: NavigateOptions) =>
        options ? navigate(to as To, options) : navigate(to as To);

      if (typeof to === "string") {
        const [pathname, search] = to.split("?");
        const searchQuery = mergeSearchParams(search);
        nav({ pathname, search: searchQuery }, options);
      } else if (typeof to === "number") {
        nav(to, options);
      } else {
        const searchQuery = mergeSearchParams(to.search);
        nav({ ...to, search: searchQuery }, options);
      }
    },
    []
  );
  return navigateWithAdvertiser;
};
