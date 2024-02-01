import { Advertiser } from "common/types";

import { getUserFromCache } from "./users";

export const ADVERTISER_STORAGE_KEY = "aid";

export const defaultAdvertiser: Advertiser = {
  id: "-1",
  name: "No advertiser",
  countries: [],
  currencies: [],
  primary_currency: "USD",
  creatives_languages: {},
  exchange_rates: {
    USD: 1,
    TRY: 1,
    AED: 1,
    GBP: 1,
    EUR: 1,
    MXN: 1,
    AUD: 1,
    CAD: 1,
    BRL: 1,
    SAR: 1,
    SEK: 1,
    INR: 1,
    SGD: 1,
    JPY: 1,
  },
};

export const getAdvertiserIdFromCache = (email?: string): string | null => {
  const userId = email || getUserFromCache()?.email;
  if (!userId) {
    return null;
  }
  return localStorage.getItem(`${ADVERTISER_STORAGE_KEY}:${userId}`);
};

export const setAdvertiserIdToCache = (advertiserId: string, email: string) => {
  localStorage.setItem(`${ADVERTISER_STORAGE_KEY}:${email}`, advertiserId);
};

type Params = {
  searchParams?: URLSearchParams;
  silentError?: boolean;
};

export const getAdvertiserId = ({
  searchParams,
  silentError = false,
}: Params = {}) => {
  const params = searchParams || new URLSearchParams(window.location.search);
  const advertiserId = params.get("aid");

  const isInvalidId = [null, "null", "", "-1"].includes(advertiserId);
  if (!silentError && isInvalidId) {
    throw new Error("Can't read advertiser id from the URL.");
  }

  return isInvalidId ? null : advertiserId;
};

export const getInitialAdvertiser = (
  advertisers: Advertiser[],
  email?: string,
  advertiserIdForced?: string | null,
  searchParams?: URLSearchParams
) => {
  if (!advertisers.length) {
    return defaultAdvertiser;
  }
  const urlId = getAdvertiserId({ searchParams, silentError: true });
  const advertiserId = advertiserIdForced || urlId;
  if (!advertiserId || advertiserId === "-1") {
    const cachedId = getAdvertiserIdFromCache(email);
    const advertiser: Advertiser | undefined = advertisers.find(
      (a) => a.id === cachedId
    );
    return advertiser || advertisers[0];
  }
  const advertiser: Advertiser | undefined = advertisers.find(
    (a) => a.id === advertiserId
  );
  return advertiser || defaultAdvertiser;
};
