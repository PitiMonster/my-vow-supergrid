/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GetDataParams,
  ICellRendererParams,
  ICellWithColumnEditor,
} from "@aleph/supergrid";
import { parse } from "date-fns";
import { useForm } from "react-hook-form";

import { DatePicker } from "common/components/DatePicker";
import { ToggleSwitch } from "common/components/ToggleSwitch";
import { DEFAULT_DATE_FORMAT } from "common/consts";
import { Advertiser, CalendarParams, CalendarParamsForm } from "common/types";
import {
  parseDateRange,
  parseDateRangeIntoForm,
  parseFormObjectIntoDateRange,
} from "common/utils";
import {
  getCampaignAdGroups,
  getCampaignsList,
  getStrategiesList,
} from "modules/api/requests";

import { InferGenericTypeCustom, StorybookConfigLevels } from "./types";

type DataType = {
  data: InferGenericTypeCustom<StorybookConfigLevels, "ARRAY_ITEMS">;
  metaData?: unknown;
};

export const getStrategiesData =
  (_adv?: Advertiser) =>
  async ({
    level,
    ...rest
  }: GetDataParams<
    "STRATEGY" | "CAMPAIGN" | "AD_GROUP",
    { page: number }
  >): Promise<DataType> => {
    switch (level) {
      case "STRATEGY": {
        const res = await getStrategiesList({ page_size: 100 });
        return {
          data: res.data.results,
          metaData: { page: (rest.previousRequestMetaData?.page || 0) + 1 },
        };
      }
      case "CAMPAIGN": {
        const res = await getCampaignsList(rest.parentId || "", {
          currency_type: "primary",
          page_size: 100,
        });
        // Call your BE endpoint
        return {
          data: res.data,
        };
      }

      case "AD_GROUP": {
        const strategyId =
          rest.dataSourceParams.parentNode.parent?.data.id || "";
        const res = await getCampaignAdGroups({
          strategyId,
          campaignId: rest.parentId || "",
          params: {
            currency_type: "primary",
            page_size: 100,
          },
        });
        // Call your BE endpoint
        return {
          data: res.data.results,
        };
      }

      default: {
        return {
          data: [],
        };
      }
    }
  };

export const EditableCellRender: React.FC<ICellRendererParams> = (params) => (
  <div className="flex flex-row justify-between items-center">
    {params.value}
  </div>
);

export const NameCellEditor = ({
  value,
  setValue,
}: ICellWithColumnEditor<number>) => (
  <input
    className="w-full"
    onChange={(e) => {
      setValue(Number(e.target.value));
    }}
    value={value ?? undefined}
    type="number"
    min={1}
    max={500}
  />
);

export const DatePicketRowCellEditor = (
  params: ICellWithColumnEditor<CalendarParams>
) => {
  if (!params.value) return "";

  return parseDateRange(params.value);
};

export const DatePickerColCellEditor = ({
  value,
  setValue,
  stopEditing,
}: ICellWithColumnEditor<CalendarParams>) => {
  const form = useForm<CalendarParamsForm>({
    mode: "onSubmit",
    defaultValues: { ...parseDateRangeIntoForm(value!) },
  });

  const lowerForm = form.getValues("lower");
  const upperForm = form.getValues("upper");

  return (
    <div className="w-[500px] bg-white">
      <DatePicker
        form={form}
        dateFormat={DEFAULT_DATE_FORMAT}
        onCancel={() => {
          stopEditing();
        }}
        onApply={() => {
          setValue(parseFormObjectIntoDateRange(form.getValues()));
          stopEditing();
        }}
        startDate={
          lowerForm
            ? parse(lowerForm, DEFAULT_DATE_FORMAT, new Date())
            : undefined
        }
        endDate={
          upperForm
            ? parse(upperForm, DEFAULT_DATE_FORMAT, new Date())
            : undefined
        }
        monthsShown={1}
        inline
      />
    </div>
  );
};

export const ToggleButtonCellRenderer = (
  params: ICellWithColumnEditor<"ACTIVE" | "INACTIVE">
) => (
  <ToggleSwitch
    name="status"
    onChange={(activate) => {
      params.setValue(activate ? "ACTIVE" : "INACTIVE");
    }}
    testId="line-item-activation-status"
    checked={params.value === "ACTIVE"}
  />
);
