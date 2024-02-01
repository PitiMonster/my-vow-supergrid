import {
  SuperGridConfig,
  InferGenericType,
  AbstractSuperGridLevelDef,
  InferGenericTypeOptions,
} from "@aleph/supergrid";
import { AxiosResponse } from "axios";

import {
  Currency,
  DateRange,
  Pagination,
  SupportedCountry,
  Format,
  CampaignStatus,
  TableQueryParams,
} from "common/types";
import { AdGroupsTableParams } from "modules/api/requests";

/**
 * Supergrid
 */

export type InferGenericTypeCustom<
  T extends readonly AbstractSuperGridLevelDef[],
  P extends InferGenericTypeOptions
> = P extends "ARRAY_ITEMS" ? T[number]["data"] : InferGenericType<T, P>;

export type StorybookConfigLevels = [
  {
    level: "STRATEGY";
    data: StrategyList[];
    variables: TableQueryParams;
  },
  {
    level: "CAMPAIGN";
    data: Campaign[];
    variables: StrategyQueryParams;
  },
  {
    level: "AD_GROUP";
    data: CampaignAdGroup[];
    variables: AdGroupsTableParams;
  }
];

export function addLevelToRow(
  rows: InferGenericTypeCustom<StorybookConfigLevels, "ARRAY_ITEMS">,
  level: InferGenericTypeCustom<StorybookConfigLevels, "LEVELS">
) {
  return rows?.map((row) => ({ ...row, level })) ?? [];
}

export type StorybookTransformRows = ReturnType<typeof addLevelToRow>;

export type StoryBookConfigType = SuperGridConfig<
  StorybookConfigLevels,
  StorybookTransformRows
>;

/**
 * End of supergrid
 */

export type StrategyCampaignSummary = Campaign;

export type AdGroupsGroupByOption =
  | "audience_set_name"
  | "inventory_source"
  | "device";

export type CampaignMetrics = {
  conversions: number | null;
  impressions: number | null;
  purchases: number | null;
  click_throughs: number | null;
  display_currency: Currency | null;
  total_sales: string | null;
  total_cost: string | null;
  roas: string | null;
  ecpm: string | null;
  cpa: string | null;
  ecpc: string | null;
  cvr: string | null;
  acos: string | null;
  ctr: string | null;
};

export type CampaignAdGroup = {
  id: string;
  name: string;
  status: CampaignStatus;
  display_currency: Currency;
  metrics: CampaignMetrics;
  base_supply_bid: string | null;
  pacing_ratio: string | null;
  type: Format;
  delivery_activation_status: "ACTIVE" | "INACTIVE";
  audience_set_name: string;
  inventory_source: string;
  device: AdGroupDevice;
  amz_creation_status: "Draft" | "Creating" | "Ready" | "Failed";
  days_active: number;
  is_archived: boolean;
  is_readonly: boolean;
  is_syncing?: boolean;
  failure_reason: string;
  targeting: string;
};

export type getCampaignAdGroupsResponse = AxiosResponse<
  Pagination<CampaignAdGroup>
>;

export type CampaignAdGroupGroup = {
  group_name: string;
  metrics: CampaignMetrics;
};

export type getCampaignAdGroupsGroupsResponse = AxiosResponse<
  Pagination<CampaignAdGroupGroup[]>
>;

const standardDisplayDevices = [
  "desktop_and_mobile_web",
  "mobile_web",
  "mobile_ios",
  "mobile_android",
  "desktop",
] as const;
export type StandardDisplayDevices = typeof standardDisplayDevices[number];

const aapMobileAppDevices = [
  "iphone",
  "ipad",
  "android",
  "kindle_fire",
  "kindle_fire_hd",
] as const;
export type AapMobileAppDevices = typeof aapMobileAppDevices[number];

const videoDevices = [
  "desktop",
  "mobile",
  "connected_tv",
  "desktop_and_mobile",
  "mobile_and_connected_tv",
  "desktop_and_connected_tv",
  "all",
] as const;
export type VideoDevices = typeof videoDevices[number];

export type AdGroupDevice =
  | StandardDisplayDevices
  | AapMobileAppDevices
  | VideoDevices;

export type AdGroup = {
  id: string;
  name: string;
  audience_set: string;
  creatives: string[];
  base_supply_bid: number;
  budget: number | null;
  pacing: string;
  last_fetched_data_updated_at: string;
  is_archived: boolean;
  is_readonly: boolean;
};

export const strategyGoals = [
  "awareness",
  "conversion",
  "engagement",
  "considerations",
  "purchases",
  "purchases_on_off",
] as const;
export type StrategyGoal = typeof strategyGoals[number];

export const awarenessGoalKPIs = ["cpvc", "reach", "vcr"] as const;
export type AwarenessGoalKPIs = typeof awarenessGoalKPIs[number];

export const engagementGoalKPIs = ["ctr", "ecpc", "cpvc", "vcr"] as const;
export type EngagementGoalKPIs = typeof engagementGoalKPIs[number];

export const conversionsGoalKPIs = ["cpa"] as const;
export type ConversionsGoalKPIs = typeof conversionsGoalKPIs[number];

export const considerationsGoalKPIs = ["cpdpv", "dpvr"] as const;
export type ConsiderationsGoalKPIs = typeof considerationsGoalKPIs[number];

export const purchasesGoalKPIs = [
  "roas",
  "total_roas",
  "combined_roas",
] as const;
export type PurchasesGoalKPIs = typeof purchasesGoalKPIs[number];

export const purchasesOnOffGoalKPIs = ["combined_roas"] as const;
export type PurchasesOnOffGoalKPIs = typeof purchasesGoalKPIs[number];

export type KPIMetric =
  | AwarenessGoalKPIs
  | EngagementGoalKPIs
  | ConversionsGoalKPIs
  | ConsiderationsGoalKPIs
  | PurchasesGoalKPIs;

export type GoalAndKPI = {
  goal?: StrategyGoal;
  kpi?: KPIMetric;
};

export type CampaignDeliveryActivationStatus =
  | "INACTIVE"
  | "ACTIVE"
  | "PENDING";

export type Campaign = {
  id: string;
  amz_advertiser_id: string;
  name: string;
  status: CampaignStatus;
  market: SupportedCountry;
  goal_and_kpi: GoalAndKPI;
  format: Format;
  flight_dates: DateRange;
  line_items: AdGroup[];
  budget: string;
  display_currency: Currency;
  metrics: CampaignMetrics;
  base_supply_bid: string | null;
  pacing_ratio: string | null;
  delivery_activation_status: CampaignDeliveryActivationStatus;
  days_active: number;
  is_archived: boolean;
  is_readonly: boolean;
  is_syncing: boolean;
  failure_reason: string | null;
};

export type StrategyQueryParams = TableQueryParams & {
  currency_type: "market" | "primary";
  status?: string;
  metrics_date_range?: string;
};

export const productLocations = [
  "SOLD_ON_AMAZON",
  "NOT_SOLD_ON_AMAZON",
] as const;
export type ProductLocation = typeof productLocations[number];

export const strategyStatusList = [
  "1_delivering",
  "2_out_of_budget",
  "3_ended",
  "4_not_running",
  "5_ready_to_deliver",
  "6_inactive",
] as const;

export type StrategyStatus = typeof strategyStatusList[number];

export const activationStatus = ["ACTIVE", "INACTIVE"] as const;
export type ActivationStatus = typeof activationStatus[number];

export type GenericStrategy = {
  name: string;
  flight_dates: DateRange;
  product_categories: string[];
  video_product_categories: string[];
  primary_currency?: Currency;
  is_archived?: boolean;
  is_readonly?: boolean;
  budget?: string;
  goal?: StrategyGoal;
  is_draft: boolean;
  is_syncing: boolean;
  failure_reason: string | null;
};

export type StrategyMetrics = {
  conversions: number | null;
  impressions: number | null;
  click_throughs: number | null;
  display_currency: Currency | null;
  total_cost: string | null;
  purchases: number | null;
  ecpc: string | null;
  ecpm: string | null;
  ctr: string | null;
  total_sales?: string | null;
  roas?: string | null;
  cpa?: string | null;
  cvr?: string | null;
  acos?: string | null;
};

export type Strategy = GenericStrategy & {
  id: string;
  budget: string;
  formats: Format[];
  markets: SupportedCountry[];
  goals_and_kpis: GoalAndKPI[];
  product_location: ProductLocation;
  last_exported: string | null;
  status: StrategyStatus;
  metrics: StrategyMetrics;
  pacing_ratio: string | null;
  asin_numbers: string;
  delivery_activation_status: ActivationStatus;
  created_at: string;
};

export type StrategyList = Omit<
  Strategy,
  | "pacing_ratio"
  | "asin_numbers"
  | "delivery_activation_status"
  | "goals_and_kpis"
  | "last_exported"
> & { is_draft: boolean };

export type StrategiesListResponse = Pagination<StrategyList>;

export type ArchiveCampaignsFromStrategyPayload = {
  object_ids: string[];
};

export type ArchiveAdGroupsFromStrategyPayload = {
  object_ids: string[];
};
