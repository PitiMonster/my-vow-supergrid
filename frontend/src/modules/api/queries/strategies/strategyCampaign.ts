import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useContext } from "react";

import { UserContext } from "common/utils";
import { queriesNames } from "modules/api/consts";
import { AdGroupsTableParams, getCampaignAdGroups } from "modules/api/requests";
import { getCampaignAdGroupsResponse } from "modules/Strategies/types";

export const useCampaignAdGroups = (
  params: AdGroupsTableParams,
  options: UseQueryOptions<getCampaignAdGroupsResponse>,
  strategyId = "",
  campaignId = ""
) => {
  const { advertiser } = useContext(UserContext);
  const query = useQuery<getCampaignAdGroupsResponse>({
    ...{
      ...options,
      enabled: !!strategyId && !!campaignId && options.enabled,
    },
    queryKey: [
      queriesNames["strategy-campaign-ad-groups"],
      advertiser?.name,
      JSON.stringify(params),
      strategyId,
      campaignId,
    ],
    queryFn: () => getCampaignAdGroups({ strategyId, campaignId, params }),
  });
  return { ...query };
};
