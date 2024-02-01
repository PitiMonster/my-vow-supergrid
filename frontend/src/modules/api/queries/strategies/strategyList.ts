import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useContext } from "react";

import { TableQueryParams } from "common/types";
import { UserContext } from "common/utils";
import { queriesNames } from "modules/api/consts";
import { getStrategiesList } from "modules/api/requests";
import { StrategiesListResponse } from "modules/Strategies/types";

export const useStrategyList = (
  queryParams: TableQueryParams,
  options?: UseQueryOptions<
    () => Promise<AxiosResponse<StrategiesListResponse>>
  >
) => {
  const { advertiser } = useContext(UserContext);

  const query = useQuery<() => Promise<AxiosResponse<StrategiesListResponse>>>({
    ...options,
    queryKey: [
      queriesNames["strategy-list"],
      advertiser?.name,
      JSON.stringify(queryParams),
    ],
    queryFn: () => () => getStrategiesList(queryParams),
  });
  return { ...query };
};
