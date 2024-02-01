import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useContext } from "react";

import { UserContext } from "common/utils";
import { queriesNames } from "modules/api/consts";
import { getCampaignsList } from "modules/api/requests";
import { StrategyQueryParams, Campaign } from "modules/Strategies/types";

export const useCampaignsList = (
  params: StrategyQueryParams,
  strategyId?: string,
  options?: UseQueryOptions<AxiosResponse<Campaign[]>>
) => {
  const { advertiser } = useContext(UserContext);

  const query = useQuery<AxiosResponse<Campaign[]>>({
    ...{ enabled: !!strategyId, ...options },
    queryKey: [
      queriesNames["campaigns-list"],
      advertiser?.name,
      JSON.stringify(params),
      strategyId,
    ],
    queryFn: () => getCampaignsList(strategyId!, params),
  });
  return { ...query };
};
