import { get, post } from "api";

import {
  Campaign,
  StrategyQueryParams,
  ArchiveCampaignsFromStrategyPayload,
  ArchiveAdGroupsFromStrategyPayload,
} from "modules/Strategies/types";

export const getCampaignsList = (id: string, params: StrategyQueryParams) =>
  get<Campaign[]>(`/campaigns/${id}/orders/`, { params });

export const archiveCampaignsFromStrategy = (data: {
  strategyId: string;
  data: ArchiveCampaignsFromStrategyPayload;
}) => post(`/campaigns/${data.strategyId}/orders/archive/`, data.data);

export const archiveAdGroupsFromStrategy = (data: {
  strategyId: string;
  data: ArchiveAdGroupsFromStrategyPayload;
}) => post(`/campaigns/${data.strategyId}/line-items/archive/`, data.data);

export const unarchiveCampaignsFromStrategy = (data: {
  strategyId: string;
  data: ArchiveCampaignsFromStrategyPayload;
}) => post(`/campaigns/${data.strategyId}/orders/unarchive/`, { ...data.data });

export const unarchiveAdGroup = (data: {
  strategyId: string;
  adGroupId: string;
}) =>
  post(`/campaigns/${data.strategyId}/line-items/unarchive/`, {
    object_ids: [data.adGroupId],
  });
