import { get } from "api";

import { TableQueryParams } from "common/types";
import { StrategiesListResponse } from "modules/Strategies/types";

export const getStrategiesList = (params: TableQueryParams) =>
  get<StrategiesListResponse>("/strategies/", { params });
