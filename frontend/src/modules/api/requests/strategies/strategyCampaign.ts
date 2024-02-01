import { get } from "api";

import { Pagination, TableQueryParams } from "common/types";
import { CampaignAdGroup } from "modules/Strategies/types";

export type AdGroupsTableParams = TableQueryParams & {
  currency_type: "market" | "primary";
  status?: string;
  audience_set_name?: string;
  inventory_source?: string;
  device?: string;
};

export const getCampaignAdGroups = (data: {
  strategyId: string;
  campaignId: string;
  params: AdGroupsTableParams;
}) =>
  get<Pagination<CampaignAdGroup>>(
    `/campaigns/${data.strategyId}/orders/${data.campaignId}/line-items/`,
    {
      params: data.params,
    }
  );
