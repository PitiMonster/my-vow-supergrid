import { get, post } from "api";

import {
  Campaign,
  StrategyQueryParams,
  ArchiveCampaignsFromStrategyPayload,
  ArchiveAdGroupsFromStrategyPayload,
} from "modules/Strategies/types";

export const getCampaignsList = (id: string, params: StrategyQueryParams) =>
  get<Campaign[]>(`/strategies/${id}/campaigns/`, { params });

export const archiveCampaignsFromStrategy = (data: {
  strategyId: string;
  data: ArchiveCampaignsFromStrategyPayload;
}) => post(`/strategies/${data.strategyId}/campaigns/archive/`, data.data);

export const archiveAdGroupsFromStrategy = (data: {
  strategyId: string;
  data: ArchiveAdGroupsFromStrategyPayload;
}) => post(`/strategies/${data.strategyId}/ad-groups/archive/`, data.data);

export const unarchiveCampaignsFromStrategy = (data: {
  strategyId: string;
  data: ArchiveCampaignsFromStrategyPayload;
}) =>
  post(`/strategies/${data.strategyId}/campaigns/unarchive/`, { ...data.data });

export const unarchiveAdGroup = (data: {
  strategyId: string;
  adGroupId: string;
}) =>
  post(`/strategies/${data.strategyId}/ad-groups/unarchive/`, {
    object_ids: [data.adGroupId],
  });
