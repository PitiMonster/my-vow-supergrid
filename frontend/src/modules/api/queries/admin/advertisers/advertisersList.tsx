import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import _ from "lodash";
import { useContext } from "react";

import { UseQueryOptionsResponse } from "common/types";
import { UserContext } from "common/utils";
import {
  AdvertiserHiddenStatus,
  AdvertisersListResponse,
  AdvertisersQueryParams,
  AdvertiserStatus,
} from "modules/Advertisers/types";
import { queriesNames } from "modules/api/consts";
import { getAdvertisersList } from "modules/api/requests";

// Backend statuses also contains To Create, but we don't want to show it
// instead we show Pending status
const mapStatusFilters = (statuses: AdvertiserStatus[] | undefined) => {
  const modifiedStatuses:
    | (AdvertiserStatus | AdvertiserHiddenStatus)[]
    | undefined = _.cloneDeep(statuses);
  const isPendingApplied = modifiedStatuses?.some(
    (status) => status === "Pending"
  );

  if (isPendingApplied) modifiedStatuses?.push("To Create");
  return modifiedStatuses?.join(",");
};

export const useAdvertisersList = (
  queryParams: AdvertisersQueryParams,
  options?: UseQueryOptionsResponse<AdvertisersListResponse>
) => {
  const { advertiser } = useContext(UserContext);

  const query = useQuery<AxiosResponse<AdvertisersListResponse>>({
    ...options,
    queryKey: [
      queriesNames["advertisers-list"],
      advertiser?.name,
      JSON.stringify({
        ...queryParams,
        status: mapStatusFilters(queryParams.status),
      }),
    ],
    queryFn: () =>
      getAdvertisersList({
        ...queryParams,
        status: mapStatusFilters(queryParams.status),
      }),
  });
  return { ...query };
};
