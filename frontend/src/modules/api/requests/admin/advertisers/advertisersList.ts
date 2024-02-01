import { get } from "api";

import {
  AdvertisersListResponse,
  GetAdvertisersQueryParams,
} from "modules/Advertisers/types";

export const getAdvertisersList = (params: GetAdvertisersQueryParams) =>
  get<AdvertisersListResponse>("/admin/advertiser/", { params });
